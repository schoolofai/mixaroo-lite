import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdirSync, rmSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const testDir = join(tmpdir(), `mx-lite-history-edge-${Date.now()}`);
vi.mock('../config.js', () => ({
  getConfigDir: () => testDir,
}));

import { addHistoryEntry, readHistory, getRecentHistory, getHistoryPath } from '../history.js';

describe('history edge cases', () => {
  beforeEach(() => {
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe('corrupted/malformed history file', () => {
    it('should handle empty file', () => {
      writeFileSync(getHistoryPath(), '', 'utf-8');
      expect(readHistory()).toEqual([]);
    });

    it('should handle null JSON', () => {
      writeFileSync(getHistoryPath(), 'null', 'utf-8');
      expect(readHistory()).toEqual([]);
    });

    it('should handle array of non-objects', () => {
      writeFileSync(getHistoryPath(), '[1, 2, 3]', 'utf-8');
      // Returns the array as-is since it's a valid array
      const history = readHistory();
      expect(Array.isArray(history)).toBe(true);
    });

    it('should recover by writing valid data over corrupted file', () => {
      writeFileSync(getHistoryPath(), 'corrupt!!!', 'utf-8');
      // readHistory returns [] for corrupt, then addHistoryEntry writes fresh
      addHistoryEntry({ prompt: 'fresh start', songCount: 5, youtubeUrl: 'url' });
      const history = readHistory();
      expect(history).toHaveLength(1);
      expect(history[0].prompt).toBe('fresh start');
    });
  });

  describe('special characters in entries', () => {
    it('should handle unicode prompts', () => {
      addHistoryEntry({ prompt: '日本語の音楽 🎵', songCount: 10, youtubeUrl: 'url' });
      const history = readHistory();
      expect(history[0].prompt).toBe('日本語の音楽 🎵');
    });

    it('should handle empty prompt', () => {
      addHistoryEntry({ prompt: '', songCount: 0, youtubeUrl: '' });
      const history = readHistory();
      expect(history).toHaveLength(1);
      expect(history[0].prompt).toBe('');
    });

    it('should handle very long prompt', () => {
      const longPrompt = 'a'.repeat(10000);
      addHistoryEntry({ prompt: longPrompt, songCount: 5, youtubeUrl: 'url' });
      const history = readHistory();
      expect(history[0].prompt).toBe(longPrompt);
    });
  });

  describe('getRecentHistory with boundary values', () => {
    it('should return all entries when limit exceeds count', () => {
      addHistoryEntry({ prompt: 'only one', songCount: 5, youtubeUrl: 'url' });
      const recent = getRecentHistory(100);
      expect(recent).toHaveLength(1);
    });

    it('should return empty for limit 0 (slice 0,0)', () => {
      addHistoryEntry({ prompt: 'test', songCount: 5, youtubeUrl: 'url' });
      const recent = getRecentHistory(0);
      expect(recent).toHaveLength(0);
    });

    it('should handle negative limit gracefully', () => {
      addHistoryEntry({ prompt: 'test', songCount: 5, youtubeUrl: 'url' });
      // slice(0, -1) removes last element
      const recent = getRecentHistory(-1);
      expect(recent).toHaveLength(0);
    });
  });

  describe('MAX_HISTORY cap behavior', () => {
    it('should keep newest entries when capped', () => {
      for (let i = 0; i < 105; i++) {
        addHistoryEntry({ prompt: `p${i}`, songCount: 1, youtubeUrl: `u${i}` });
      }
      const history = readHistory();
      expect(history).toHaveLength(100);
      // Newest (p104) should be first
      expect(history[0].prompt).toBe('p104');
      // Oldest kept should be p5 (p0-p4 dropped)
      expect(history[99].prompt).toBe('p5');
    });
  });

  describe('timestamp format', () => {
    it('should produce valid ISO 8601 timestamps', () => {
      const entry = addHistoryEntry({ prompt: 'test', songCount: 5, youtubeUrl: 'url' });
      const parsed = new Date(entry.timestamp);
      expect(parsed.getTime()).not.toBeNaN();
      expect(entry.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe('file integrity', () => {
    it('should write valid JSON after multiple operations', () => {
      for (let i = 0; i < 10; i++) {
        addHistoryEntry({ prompt: `entry ${i}`, songCount: i, youtubeUrl: `url${i}` });
      }
      const raw = readFileSync(getHistoryPath(), 'utf-8');
      expect(() => JSON.parse(raw)).not.toThrow();
      const parsed = JSON.parse(raw);
      expect(parsed).toHaveLength(10);
    });
  });
});
