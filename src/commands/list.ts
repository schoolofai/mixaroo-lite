import chalk from 'chalk';
import { listPlaylists } from '../services/playlist-store.js';

export async function listCommand(): Promise<void> {
  const playlists = listPlaylists();

  if (playlists.length === 0) {
    console.log(chalk.yellow('No saved playlists yet.'));
    console.log();
    console.log(`Generate and save one with: ${chalk.cyan('mx-lite "your prompt" --save')}`);
    return;
  }

  console.log(chalk.bold(`📋 Saved Playlists (${playlists.length})`));
  console.log();

  for (const pl of playlists) {
    const date = new Date(pl.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const songCount = pl.songs.length;
    console.log(`  ${chalk.cyan(pl.id)}  ${date}  ${chalk.gray(`${songCount} songs`)}`);
    console.log(`  ${chalk.white(pl.prompt)}`);
    console.log();
  }

  console.log(chalk.gray(`Play a playlist: mx-lite play <id>`));
}
