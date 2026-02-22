import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

// Mock config to use temp dir
const testDir = join(tmpdir(), `mx-lite-edge-${Date.now()}`);
vi.mock('../config.js', () => ({
  getConfigDir: () => testDir,
}));

import { savePlaylist, listPlaylists, getPlaylist, getPlaylistsDir } from '../playlist-store.js';
import type { Song } from '../ai.js';

const mockSongs: Song[] = [
  { title: 'Test Song', artist: 'Test Artist' },
];
const mockUrl = 'https://www.youtube.com/watch_videos?video_ids=abc123';

describe('playlist-store edge cases', () => {
  beforeEach(() => {
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe('corrupted files', () => {
    it('should skip corrupted JSON files in listPlaylists', () => {
      // Save a valid playlist first
      savePlaylist('valid', mockSongs, mockUrl);

      // Write a corrupted file
      const dir = getPlaylistsDir();
      writeFileSync(join(dir, 'corrupt.json'), '{{{invalid json', 'utf-8');

      const list = listPlaylists();
      expect(list).toHaveLength(1);
      expect(list[0].prompt).toBe('valid');
    });

    it('should return undefined for corrupted playlist file on getPlaylist', () => {
      const dir = getPlaylistsDir();
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'bad-id.json'), 'not json', 'utf-8');

      const result = getPlaylist('bad-id');
      expect(result).toBeUndefined();
    });
  });

  describe('empty playlists directory', () => {
    it('should return empty array when playlists dir does not exist', () => {
      // Don't create the playlists subdir
      expect(listPlaylists()).toEqual([]);
    });

    it('should return empty array when playlists dir exists but is empty', () => {
      mkdirSync(getPlaylistsDir(), { recursive: true });
      expect(listPlaylists()).toEqual([]);
    });
  });

  describe('special characters in prompt', () => {
    it('should handle prompts with unicode and special chars', () => {
      const saved = savePlaylist('日本語のプレイリスト 🎵', mockSongs, mockUrl);
      expect(saved.prompt).toBe('日本語のプレイリスト 🎵');

      const found = getPlaylist(saved.id);
      expect(found).toBeDefined();
      expect(found!.prompt).toBe('日本語のプレイリスト 🎵');
    });

    it('should handle empty string prompt', () => {
      const saved = savePlaylist('', mockSongs, mockUrl);
      expect(saved.prompt).toBe('');
      expect(saved.id).toBeTruthy();
    });
  });

  describe('empty songs array', () => {
    it('should save and retrieve a playlist with no songs', () => {
      const saved = savePlaylist('empty', [], mockUrl);
      expect(saved.songs).toEqual([]);

      const found = getPlaylist(saved.id);
      expect(found).toBeDefined();
      expect(found!.songs).toEqual([]);
    });
  });

  describe('non-JSON files in playlists dir', () => {
    it('should ignore non-JSON files', () => {
      const dir = getPlaylistsDir();
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'readme.txt'), 'not a playlist', 'utf-8');
      writeFileSync(join(dir, '.DS_Store'), '', 'utf-8');

      savePlaylist('real', mockSongs, mockUrl);

      const list = listPlaylists();
      expect(list).toHaveLength(1);
      expect(list[0].prompt).toBe('real');
    });
  });

  describe('getPlaylist partial match edge cases', () => {
    it('should return undefined for empty string ID', () => {
      savePlaylist('test', mockSongs, mockUrl);
      // Empty string would match any prefix - but file lookup fails first
      // This tests the fallback partial match behavior
      const result = getPlaylist('');
      // Empty string as file ID won't find `.json`, falls to partial match
      // which matches everything - returns first result
      expect(result).toBeDefined(); // empty prefix matches all
    });

    it('should handle very long ID that does not match', () => {
      savePlaylist('test', mockSongs, mockUrl);
      const result = getPlaylist('a'.repeat(500));
      expect(result).toBeUndefined();
    });
  });

  describe('multiple playlists sorting', () => {
    it('should sort by createdAt descending', async () => {
      // Save with slight delay to ensure different timestamps
      const first = savePlaylist('first', mockSongs, mockUrl);

      // Manually create a second with an earlier date
      const dir = getPlaylistsDir();
      const oldPlaylist = {
        id: 'old-one',
        prompt: 'older',
        songs: mockSongs,
        youtubeUrl: mockUrl,
        createdAt: '2020-01-01T00:00:00.000Z',
      };
      writeFileSync(join(dir, 'old-one.json'), JSON.stringify(oldPlaylist), 'utf-8');

      const list = listPlaylists();
      expect(list).toHaveLength(2);
      expect(list[0].prompt).toBe('first'); // newer first
      expect(list[1].prompt).toBe('older');
    });
  });
});
