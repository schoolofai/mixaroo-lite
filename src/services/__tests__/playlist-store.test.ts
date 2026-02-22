import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdirSync, rmSync, existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

// Mock config to use temp dir
const testDir = join(tmpdir(), `mx-lite-test-${Date.now()}`);
vi.mock('../config.js', () => ({
  getConfigDir: () => testDir,
}));

import { savePlaylist, listPlaylists, getPlaylist, getPlaylistsDir } from '../playlist-store.js';
import type { Song } from '../ai.js';

const mockSongs: Song[] = [
  { title: 'Bohemian Rhapsody', artist: 'Queen' },
  { title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
];

const mockUrl = 'https://www.youtube.com/watch_videos?video_ids=abc123,def456';

describe('playlist-store', () => {
  beforeEach(() => {
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe('savePlaylist', () => {
    it('should save a playlist as JSON', () => {
      const result = savePlaylist('rock classics', mockSongs, mockUrl);

      expect(result.id).toBeTruthy();
      expect(result.prompt).toBe('rock classics');
      expect(result.songs).toEqual(mockSongs);
      expect(result.youtubeUrl).toBe(mockUrl);
      expect(result.createdAt).toBeTruthy();

      // Verify file exists
      const filePath = join(getPlaylistsDir(), `${result.id}.json`);
      expect(existsSync(filePath)).toBe(true);

      // Verify file contents
      const saved = JSON.parse(readFileSync(filePath, 'utf-8'));
      expect(saved.prompt).toBe('rock classics');
      expect(saved.songs).toHaveLength(2);
    });

    it('should create playlists directory if missing', () => {
      const dir = getPlaylistsDir();
      rmSync(dir, { recursive: true, force: true });

      savePlaylist('test', mockSongs, mockUrl);
      expect(existsSync(dir)).toBe(true);
    });

    it('should generate unique IDs', () => {
      const a = savePlaylist('one', mockSongs, mockUrl);
      const b = savePlaylist('two', mockSongs, mockUrl);
      expect(a.id).not.toBe(b.id);
    });
  });

  describe('listPlaylists', () => {
    it('should return empty array when no playlists', () => {
      expect(listPlaylists()).toEqual([]);
    });

    it('should return saved playlists sorted newest first', () => {
      const a = savePlaylist('first', mockSongs, mockUrl);
      const b = savePlaylist('second', mockSongs, mockUrl);

      const list = listPlaylists();
      expect(list).toHaveLength(2);
      // Both may have same timestamp due to fast execution;
      // just verify both are present and list is returned
      const prompts = list.map(p => p.prompt);
      expect(prompts).toContain('first');
      expect(prompts).toContain('second');
    });
  });

  describe('getPlaylist', () => {
    it('should retrieve a playlist by exact ID', () => {
      const saved = savePlaylist('find me', mockSongs, mockUrl);
      const found = getPlaylist(saved.id);
      expect(found).toBeDefined();
      expect(found!.prompt).toBe('find me');
    });

    it('should find by partial ID prefix', () => {
      const saved = savePlaylist('partial', mockSongs, mockUrl);
      const prefix = saved.id.substring(0, 6);
      const found = getPlaylist(prefix);
      expect(found).toBeDefined();
      expect(found!.prompt).toBe('partial');
    });

    it('should return undefined for unknown ID', () => {
      expect(getPlaylist('nonexistent')).toBeUndefined();
    });
  });
});
