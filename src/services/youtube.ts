import yts from 'yt-search';
import type { Song } from './ai.js';

// Search result type
export interface SearchResult {
  song: Song;
  videoId: string | null;
}

// Progress callback type
export type ProgressCallback = (current: number, total: number, song: Song, found: boolean) => void;

/**
 * Search YouTube for a single song
 * Returns video ID or null if not found
 */
export async function searchSong(title: string, artist: string): Promise<string | null> {
  const queries = [
    `${artist} - ${title}`,
    `${title} ${artist}`,
    `${artist} ${title} official`
  ];

  for (const query of queries) {
    try {
      const result = await yts(query);
      
      // Get first video result
      const video = result.videos[0];
      if (video) {
        return video.videoId;
      }
    } catch (_error) {
      // Try next query variation
      continue;
    }
  }

  return null;
}

/**
 * Delay helper
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Search YouTube for multiple songs
 * Returns array of results with video IDs (or null for not found)
 * Includes rate limiting and progress reporting
 */
export async function searchSongs(
  songs: Song[],
  onProgress?: ProgressCallback
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const delayBetweenRequests = 200; // ms delay to avoid rate limiting

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    
    try {
      const videoId = await searchSong(song.title, song.artist);
      results.push({ song, videoId });
      
      if (onProgress) {
        onProgress(i + 1, songs.length, song, videoId !== null);
      }
    } catch (_error) {
      // If search fails, mark as not found
      results.push({ song, videoId: null });
      
      if (onProgress) {
        onProgress(i + 1, songs.length, song, false);
      }
    }

    // Small delay between requests to avoid rate limiting
    if (i < songs.length - 1) {
      await delay(delayBetweenRequests);
    }
  }

  return results;
}

/**
 * Build a YouTube playlist URL from video IDs
 * Format: https://www.youtube.com/watch_videos?video_ids=ID1,ID2,ID3
 */
export function buildPlaylistUrl(videoIds: string[]): string {
  const validIds = videoIds.filter(id => id !== null && id.length > 0);
  
  if (validIds.length === 0) {
    throw new Error('No valid video IDs to create playlist');
  }

  return `https://www.youtube.com/watch_videos?video_ids=${validIds.join(',')}`;
}

/**
 * Get statistics about search results
 */
export function getSearchStats(results: SearchResult[]): {
  total: number;
  found: number;
  notFound: number;
  notFoundSongs: Song[];
} {
  const found = results.filter(r => r.videoId !== null);
  const notFound = results.filter(r => r.videoId === null);

  return {
    total: results.length,
    found: found.length,
    notFound: notFound.length,
    notFoundSongs: notFound.map(r => r.song)
  };
}
