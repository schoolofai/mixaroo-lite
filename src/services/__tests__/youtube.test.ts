import { describe, it, expect } from 'vitest';
import { buildPlaylistUrl, getSearchStats } from '../youtube.js';
import type { SearchResult } from '../youtube.js';

describe('buildPlaylistUrl', () => {
  it('builds URL from video IDs', () => {
    const url = buildPlaylistUrl(['abc123', 'def456']);
    expect(url).toBe('https://www.youtube.com/watch_videos?video_ids=abc123,def456');
  });

  it('filters out empty strings', () => {
    const url = buildPlaylistUrl(['abc123', '', 'def456']);
    expect(url).toBe('https://www.youtube.com/watch_videos?video_ids=abc123,def456');
  });

  it('throws on empty array', () => {
    expect(() => buildPlaylistUrl([])).toThrow('No valid video IDs');
  });
});

describe('getSearchStats', () => {
  const results: SearchResult[] = [
    { song: { title: 'Song A', artist: 'Artist 1' }, videoId: 'abc' },
    { song: { title: 'Song B', artist: 'Artist 2' }, videoId: null },
    { song: { title: 'Song C', artist: 'Artist 3' }, videoId: 'def' },
  ];

  it('counts found and not found correctly', () => {
    const stats = getSearchStats(results);
    expect(stats.total).toBe(3);
    expect(stats.found).toBe(2);
    expect(stats.notFound).toBe(1);
  });

  it('returns not-found songs', () => {
    const stats = getSearchStats(results);
    expect(stats.notFoundSongs).toHaveLength(1);
    expect(stats.notFoundSongs[0].title).toBe('Song B');
  });

  it('handles all found', () => {
    const allFound: SearchResult[] = [
      { song: { title: 'X', artist: 'Y' }, videoId: 'id1' },
    ];
    const stats = getSearchStats(allFound);
    expect(stats.notFound).toBe(0);
  });

  it('handles empty array', () => {
    const stats = getSearchStats([]);
    expect(stats.total).toBe(0);
    expect(stats.found).toBe(0);
  });
});
