import { mkdirSync, readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { getConfigDir } from './config.js';
import type { Song } from './ai.js';

export interface SavedPlaylist {
  id: string;
  prompt: string;
  songs: Song[];
  youtubeUrl: string;
  createdAt: string;
}

/**
 * Get the playlists directory path
 */
export function getPlaylistsDir(): string {
  return join(getConfigDir(), 'playlists');
}

/**
 * Ensure the playlists directory exists
 */
function ensurePlaylistsDir(): string {
  const dir = getPlaylistsDir();
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
}

/**
 * Generate a short unique ID for a playlist
 */
function generateId(): string {
  const now = Date.now();
  const random = Math.random().toString(36).substring(2, 6);
  return `${now.toString(36)}-${random}`;
}

/**
 * Save a playlist to disk
 */
export function savePlaylist(prompt: string, songs: Song[], youtubeUrl: string): SavedPlaylist {
  const dir = ensurePlaylistsDir();
  const playlist: SavedPlaylist = {
    id: generateId(),
    prompt,
    songs,
    youtubeUrl,
    createdAt: new Date().toISOString(),
  };

  const filePath = join(dir, `${playlist.id}.json`);
  writeFileSync(filePath, JSON.stringify(playlist, null, 2), 'utf-8');
  return playlist;
}

/**
 * List all saved playlists, sorted by date (newest first)
 */
export function listPlaylists(): SavedPlaylist[] {
  const dir = getPlaylistsDir();
  if (!existsSync(dir)) {
    return [];
  }

  const files = readdirSync(dir).filter(f => f.endsWith('.json'));
  const playlists: SavedPlaylist[] = [];

  for (const file of files) {
    try {
      const data = readFileSync(join(dir, file), 'utf-8');
      playlists.push(JSON.parse(data) as SavedPlaylist);
    } catch {
      // Skip corrupt files
    }
  }

  return playlists.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get a playlist by ID
 */
export function getPlaylist(id: string): SavedPlaylist | undefined {
  const dir = getPlaylistsDir();
  const filePath = join(dir, `${id}.json`);

  if (!existsSync(filePath)) {
    // Try partial match
    const playlists = listPlaylists();
    return playlists.find(p => p.id.startsWith(id));
  }

  try {
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as SavedPlaylist;
  } catch {
    return undefined;
  }
}
