import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock yt-search
vi.mock('yt-search', () => {
  return {
    default: vi.fn(),
  };
});

import yts from 'yt-search';
import { searchSong, searchSongs, buildPlaylistUrl, getSearchStats } from '../src/services/youtube.js';
import type { Song } from '../src/services/ai.js';

const mockYts = vi.mocked(yts);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('searchSong', () => {
  it('returns videoId on first query match', async () => {
    mockYts.mockResolvedValueOnce({
      videos: [{ videoId: 'abc123' }],
    } as any);

    const result = await searchSong('Bohemian Rhapsody', 'Queen');
    expect(result).toBe('abc123');
    expect(mockYts).toHaveBeenCalledTimes(1);
    expect(mockYts).toHaveBeenCalledWith('Queen - Bohemian Rhapsody');
  });

  it('tries second query if first returns no videos', async () => {
    mockYts
      .mockResolvedValueOnce({ videos: [] } as any)
      .mockResolvedValueOnce({ videos: [{ videoId: 'def456' }] } as any);

    const result = await searchSong('Song', 'Artist');
    expect(result).toBe('def456');
    expect(mockYts).toHaveBeenCalledTimes(2);
    expect(mockYts).toHaveBeenNthCalledWith(1, 'Artist - Song');
    expect(mockYts).toHaveBeenNthCalledWith(2, 'Song Artist');
  });

  it('tries third query if first two fail', async () => {
    mockYts
      .mockResolvedValueOnce({ videos: [] } as any)
      .mockResolvedValueOnce({ videos: [] } as any)
      .mockResolvedValueOnce({ videos: [{ videoId: 'ghi789' }] } as any);

    const result = await searchSong('Song', 'Artist');
    expect(result).toBe('ghi789');
    expect(mockYts).toHaveBeenCalledTimes(3);
    expect(mockYts).toHaveBeenNthCalledWith(3, 'Artist Song official');
  });

  it('returns null if all queries return no videos', async () => {
    mockYts.mockResolvedValue({ videos: [] } as any);

    const result = await searchSong('Nonexistent', 'Nobody');
    expect(result).toBeNull();
    expect(mockYts).toHaveBeenCalledTimes(3);
  });

  it('retries on error and tries next query', async () => {
    mockYts
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({ videos: [{ videoId: 'retry123' }] } as any);

    const result = await searchSong('Song', 'Artist');
    expect(result).toBe('retry123');
    expect(mockYts).toHaveBeenCalledTimes(2);
  });

  it('returns null if all queries throw errors', async () => {
    mockYts.mockRejectedValue(new Error('Network error'));

    const result = await searchSong('Song', 'Artist');
    expect(result).toBeNull();
    expect(mockYts).toHaveBeenCalledTimes(3);
  });
});

describe('searchSongs', () => {
  it('searches multiple songs and returns results', async () => {
    mockYts
      .mockResolvedValueOnce({ videos: [{ videoId: 'id1' }] } as any)
      .mockResolvedValueOnce({ videos: [{ videoId: 'id2' }] } as any);

    const songs: Song[] = [
      { title: 'Song 1', artist: 'Artist 1' },
      { title: 'Song 2', artist: 'Artist 2' },
    ];

    const results = await searchSongs(songs);
    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({ song: songs[0], videoId: 'id1' });
    expect(results[1]).toEqual({ song: songs[1], videoId: 'id2' });
  });

  it('calls progress callback', async () => {
    mockYts.mockResolvedValue({ videos: [{ videoId: 'id1' }] } as any);

    const songs: Song[] = [{ title: 'Song 1', artist: 'Artist 1' }];
    const onProgress = vi.fn();

    await searchSongs(songs, onProgress);
    expect(onProgress).toHaveBeenCalledWith(1, 1, songs[0], true);
  });

  it('reports not-found in progress callback', async () => {
    mockYts.mockResolvedValue({ videos: [] } as any);

    const songs: Song[] = [{ title: 'Song 1', artist: 'Artist 1' }];
    const onProgress = vi.fn();

    await searchSongs(songs, onProgress);
    expect(onProgress).toHaveBeenCalledWith(1, 1, songs[0], false);
  });

  it('handles search errors gracefully', async () => {
    mockYts.mockRejectedValue(new Error('fail'));

    const songs: Song[] = [{ title: 'Song 1', artist: 'Artist 1' }];
    const results = await searchSongs(songs);
    expect(results).toHaveLength(1);
    expect(results[0].videoId).toBeNull();
  });

  it('handles empty song list', async () => {
    const results = await searchSongs([]);
    expect(results).toEqual([]);
    expect(mockYts).not.toHaveBeenCalled();
  });
});

describe('buildPlaylistUrl', () => {
  it('builds URL from single video ID', () => {
    const url = buildPlaylistUrl(['abc123']);
    expect(url).toBe('https://www.youtube.com/watch_videos?video_ids=abc123');
  });

  it('builds URL from multiple video IDs', () => {
    const url = buildPlaylistUrl(['id1', 'id2', 'id3']);
    expect(url).toBe('https://www.youtube.com/watch_videos?video_ids=id1,id2,id3');
  });

  it('filters out null and empty IDs', () => {
    const url = buildPlaylistUrl(['id1', null as any, '', 'id2']);
    expect(url).toBe('https://www.youtube.com/watch_videos?video_ids=id1,id2');
  });

  it('throws on empty array', () => {
    expect(() => buildPlaylistUrl([])).toThrow('No valid video IDs');
  });

  it('throws when all IDs are null/empty', () => {
    expect(() => buildPlaylistUrl([null as any, ''])).toThrow('No valid video IDs');
  });

  it('handles 100 video IDs', () => {
    const ids = Array.from({ length: 100 }, (_, i) => `id${i}`);
    const url = buildPlaylistUrl(ids);
    expect(url).toContain('id0,id1');
    expect(url.split(',').length).toBe(100);
  });
});

describe('getSearchStats', () => {
  it('returns correct stats for mixed results', () => {
    const results = [
      { song: { title: 'A', artist: '1' }, videoId: 'id1' },
      { song: { title: 'B', artist: '2' }, videoId: null },
      { song: { title: 'C', artist: '3' }, videoId: 'id3' },
    ];

    const stats = getSearchStats(results);
    expect(stats.total).toBe(3);
    expect(stats.found).toBe(2);
    expect(stats.notFound).toBe(1);
    expect(stats.notFoundSongs).toEqual([{ title: 'B', artist: '2' }]);
  });

  it('handles all found', () => {
    const results = [
      { song: { title: 'A', artist: '1' }, videoId: 'id1' },
    ];
    const stats = getSearchStats(results);
    expect(stats.found).toBe(1);
    expect(stats.notFound).toBe(0);
    expect(stats.notFoundSongs).toEqual([]);
  });

  it('handles all not found', () => {
    const results = [
      { song: { title: 'A', artist: '1' }, videoId: null },
      { song: { title: 'B', artist: '2' }, videoId: null },
    ];
    const stats = getSearchStats(results);
    expect(stats.found).toBe(0);
    expect(stats.notFound).toBe(2);
  });

  it('handles empty results', () => {
    const stats = getSearchStats([]);
    expect(stats.total).toBe(0);
    expect(stats.found).toBe(0);
    expect(stats.notFound).toBe(0);
    expect(stats.notFoundSongs).toEqual([]);
  });
});
