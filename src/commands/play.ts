import chalk from 'chalk';
import open from 'open';
import { getPlaylist } from '../services/playlist-store.js';

export async function playCommand(id: string): Promise<void> {
  if (!id) {
    console.error(chalk.red('❌ Please provide a playlist ID'));
    console.log();
    console.log(`Run ${chalk.cyan('mx-lite list')} to see saved playlists.`);
    process.exit(1);
  }

  const playlist = getPlaylist(id);

  if (!playlist) {
    console.error(chalk.red(`❌ Playlist not found: ${id}`));
    console.log();
    console.log(`Run ${chalk.cyan('mx-lite list')} to see saved playlists.`);
    process.exit(1);
  }

  console.log(chalk.bold(`▶️  ${playlist.prompt}`));
  console.log(chalk.gray(`   ${playlist.songs.length} songs · saved ${new Date(playlist.createdAt).toLocaleDateString()}`));
  console.log();
  console.log(chalk.cyan(`   ${playlist.youtubeUrl}`));
  console.log();

  // Try to open in browser
  try {
    await open(playlist.youtubeUrl);
    console.log(chalk.green('🌐 Opened in browser'));
  } catch {
    console.log(chalk.gray('   Copy the URL above to open in your browser'));
  }
}
