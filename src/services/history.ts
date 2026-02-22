import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { getConfigDir } from './config.js';

export interface HistoryEntry {
  prompt: string;
  songCount: number;
  youtubeUrl: string;
  timestamp: string;
}

const MAX_HISTORY = 100;

/**
 * Get the history file path
 */
export function getHistoryPath(): string {
  return join(getConfigDir(), 'history.json');
}

/**
 * Read all history entries
 */
export function readHistory(): HistoryEntry[] {
  const path = getHistoryPath();
  if (!existsSync(path)) {
    return [];
  }
  try {
    const data = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Add an entry to history (newest first, capped at MAX_HISTORY)
 */
export function addHistoryEntry(entry: Omit<HistoryEntry, 'timestamp'>): HistoryEntry {
  const full: HistoryEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  const history = readHistory();
  history.unshift(full);

  // Cap size
  if (history.length > MAX_HISTORY) {
    history.length = MAX_HISTORY;
  }

  writeFileSync(getHistoryPath(), JSON.stringify(history, null, 2), 'utf-8');
  return full;
}

/**
 * Get the last N history entries
 */
export function getRecentHistory(limit: number = 20): HistoryEntry[] {
  return readHistory().slice(0, limit);
}
