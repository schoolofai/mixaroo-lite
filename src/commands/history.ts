import chalk from 'chalk';
import { getRecentHistory } from '../services/history.js';

interface HistoryOptions {
  limit?: string;
}

export async function historyCommand(options: HistoryOptions): Promise<void> {
  const limit = parseInt(options.limit || '20', 10);

  if (isNaN(limit) || limit < 1) {
    console.error(chalk.red('❌ --limit must be a positive number'));
    process.exit(1);
  }

  const entries = getRecentHistory(limit);

  if (entries.length === 0) {
    console.log(chalk.yellow('No playlist history yet.'));
    console.log();
    console.log(`Generate a playlist: ${chalk.cyan('mx-lite "your prompt"')}`);
    return;
  }

  console.log(chalk.bold(`📜 Playlist History (last ${entries.length})`));
  console.log();

  for (const entry of entries) {
    const date = new Date(entry.timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    console.log(`  ${chalk.gray(date)}  ${chalk.white(entry.prompt)}  ${chalk.gray(`${entry.songCount} songs`)}`);
    console.log(`  ${chalk.cyan(entry.youtubeUrl)}`);
    console.log();
  }
}
