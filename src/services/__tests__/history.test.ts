import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const testDir = join(tmpdir(), `mx-lite-history-test-${Date.now()}`);
vi.mock('../config.js', () => ({
  getConfigDir: () => testDir,
}));

import { addHistoryEntry, readHistory, getRecentHistory, getHistoryPath } from '../history.js';

describe('history', () => {
  beforeEach(() => {
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe('readHistory', () => {
    it('should return empty array when no file exists', () => {
      expect(readHistory()).toEqual([]);
    });

    it('should return empty array for corrupt file', () => {
      writeFileSync(getHistoryPath(), 'not json', 'utf-8');
      expect(readHistory()).toEqual([]);
    });

    it('should return empty array for non-array JSON', () => {
      writeFileSync(getHistoryPath(), '{"key": "value"}', 'utf-8');
      expect(readHistory()).toEqual([]);
    });
  });

  describe('addHistoryEntry', () => {
    it('should add an entry with timestamp', () => {
      const entry = addHistoryEntry({
        prompt: 'rock classics',
        songCount: 25,
        youtubeUrl: 'https://youtube.com/watch_videos?video_ids=abc',
      });

      expect(entry.prompt).toBe('rock classics');
      expect(entry.songCount).toBe(25);
      expect(entry.timestamp).toBeTruthy();

      const history = readHistory();
      expect(history).toHaveLength(1);
      expect(history[0].prompt).toBe('rock classics');
    });

    it('should prepend new entries (newest first)', () => {
      addHistoryEntry({ prompt: 'first', songCount: 10, youtubeUrl: 'url1' });
      addHistoryEntry({ prompt: 'second', songCount: 5, youtubeUrl: 'url2' });

      const history = readHistory();
      expect(history[0].prompt).toBe('second');
      expect(history[1].prompt).toBe('first');
    });

    it('should cap at 100 entries', () => {
      for (let i = 0; i < 105; i++) {
        addHistoryEntry({ prompt: `playlist ${i}`, songCount: 10, youtubeUrl: `url${i}` });
      }
      expect(readHistory()).toHaveLength(100);
    });
  });

  describe('getRecentHistory', () => {
    it('should return last N entries', () => {
      for (let i = 0; i < 10; i++) {
        addHistoryEntry({ prompt: `p${i}`, songCount: 5, youtubeUrl: `u${i}` });
      }

      const recent = getRecentHistory(3);
      expect(recent).toHaveLength(3);
      expect(recent[0].prompt).toBe('p9');
    });

    it('should default to 20', () => {
      for (let i = 0; i < 25; i++) {
        addHistoryEntry({ prompt: `p${i}`, songCount: 5, youtubeUrl: `u${i}` });
      }
      expect(getRecentHistory()).toHaveLength(20);
    });
  });
});
