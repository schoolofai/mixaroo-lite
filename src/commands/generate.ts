import chalk from 'chalk';
import ora from 'ora';
import {
  isConfigured,
  getProvider,
  getApiKey,
  getDefaultLength,
  PROVIDER_INFO,
  AIProvider
} from '../services/config.js';
import { getAIService, Song } from '../services/ai.js';
import {
  searchSongs,
  buildPlaylistUrl,
  getSearchStats,
  SearchResult
} from '../services/youtube.js';
import { savePlaylist } from '../services/playlist-store.js';
import { displayError, parseAPIError } from '../utils/errors.js';
import { addHistoryEntry } from '../services/history.js';

interface GenerateOptions {
  length: string;
  provider?: string;
  save?: boolean;
  verbose?: boolean;
}

function verbose(options: GenerateOptions, ...args: unknown[]): void {
  if (options.verbose) {
    console.log(chalk.gray('[verbose]'), ...args);
  }
}

export async function generateCommand(prompt: string, options: GenerateOptions): Promise<void> {
  // Check if configured
  if (!isConfigured()) {
    console.log(chalk.yellow('⚠️  mixaroo-lite is not configured yet.'));
    console.log();
    console.log(`Run ${chalk.cyan('mx-lite setup')} to configure your AI provider.`);
    process.exit(1);
  }

  // Parse and validate length
  const length = parseInt(options.length, 10) || getDefaultLength();
  
  if (isNaN(length) || length < 1) {
    console.error(chalk.red('❌ Error: Length must be at least 1'));
    process.exit(1);
  }

  if (length > 100) {
    console.error(chalk.red('❌ Error: Length cannot exceed 100 songs'));
    console.log();
    console.log(chalk.yellow('💡 Try a smaller playlist:'));
    console.log(chalk.cyan(`   mx-lite "${prompt}" --length 50`));
    process.exit(1);
  }

  // Validate prompt
  if (!prompt || prompt.trim().length === 0) {
    console.error(chalk.red('❌ Error: Please provide a prompt describing your playlist'));
    console.log();
    console.log(chalk.yellow('💡 Examples:'));
    console.log(chalk.cyan('   mx-lite "upbeat 90s rock for a road trip"'));
    console.log(chalk.cyan('   mx-lite "chill lo-fi beats for studying"'));
    process.exit(1);
  }

  // Determine provider
  let provider: AIProvider;
  let apiKey: string | undefined;

  if (options.provider) {
    // Override provider
    const validProviders: AIProvider[] = ['openai', 'gemini', 'anthropic'];
    if (!validProviders.includes(options.provider as AIProvider)) {
      console.error(chalk.red(`❌ Error: Unknown provider "${options.provider}"`));
      console.log();
      console.log('Valid providers:');
      console.log('   openai, gemini, anthropic');
      process.exit(1);
    }
    provider = options.provider as AIProvider;
    apiKey = getApiKey(); // Use stored API key (assumes same key works - may need handling)
  } else {
    provider = getProvider()!;
    apiKey = getApiKey();
  }

  if (!apiKey) {
    console.error(chalk.red('❌ Error: No API key found'));
    console.log();
    console.log(`Run ${chalk.cyan('mx-lite setup')} to configure your API key.`);
    process.exit(1);
  }

  const providerInfo = PROVIDER_INFO[provider];

  // Generate playlist with AI
  console.log(chalk.blue(`🎵 Generating ${length} songs for: "${prompt}"`));
  console.log(chalk.gray(`   Using ${providerInfo.name} (${providerInfo.model})`));
  console.log();

  const aiSpinner = ora('Generating playlist with AI...').start();

  verbose(options, `Provider: ${provider}, Model: ${providerInfo.model}`);
  verbose(options, `Requesting ${length} songs for prompt: "${prompt}"`);

  let songs: Song[];
  try {
    const aiService = getAIService(provider, apiKey);
    songs = await aiService.generatePlaylist(prompt, length);
    aiSpinner.succeed(`Generated ${songs.length} songs`);
    verbose(options, `AI returned ${songs.length} songs`);
  } catch (error) {
    aiSpinner.fail('Failed to generate playlist');
    verbose(options, `AI error:`, error instanceof Error ? error.stack : error);
    const parsed = parseAPIError(error, provider);
    displayError(parsed);
    process.exit(1);
  }

  // Search YouTube for songs
  console.log();
  const ytSpinner = ora('Searching YouTube...').start();

  let results: SearchResult[];
  try {
    results = await searchSongs(songs, (current, total, song, found) => {
      ytSpinner.text = `Searching YouTube... (${current}/${total}) ${song.title}`;
      if (options.verbose && !found) {
        // Will show after spinner clears
      }
    });
    ytSpinner.succeed('YouTube search complete');
  } catch (error) {
    ytSpinner.fail('YouTube search failed');
    verbose(options, `YouTube error:`, error instanceof Error ? error.stack : error);
    displayError(error);
    process.exit(1);
  }

  // Get stats
  const stats = getSearchStats(results);

  // Display results
  console.log();
  console.log(chalk.bold(`📋 Playlist: ${prompt}`));
  console.log();

  results.forEach((result, index) => {
    const num = String(index + 1).padStart(2, ' ');
    const status = result.videoId ? chalk.green('✓') : chalk.red('✗');
    console.log(`   ${num}. ${result.song.title} - ${chalk.gray(result.song.artist)} ${status}`);
  });

  // Show not found warning
  if (stats.notFound > 0) {
    console.log();
    console.log(chalk.yellow(`⚠️  ${stats.notFound} song(s) not found on YouTube`));
  }

  // Build and display playlist URL
  const videoIds = results
    .filter(r => r.videoId !== null)
    .map(r => r.videoId as string);

  if (videoIds.length === 0) {
    console.log();
    console.error(chalk.red('❌ No songs were found on YouTube. Unable to create playlist.'));
    process.exit(1);
  }

  const playlistUrl = buildPlaylistUrl(videoIds);

  // Auto-log to history
  try {
    addHistoryEntry({ prompt, songCount: songs.length, youtubeUrl: playlistUrl });
    verbose(options, 'Logged to history');
  } catch {
    verbose(options, 'Failed to log to history');
  }

  console.log();
  console.log(chalk.bold('▶️  Play your playlist:'));
  console.log();
  console.log(chalk.cyan(`   ${playlistUrl}`));
  console.log();
  console.log(chalk.gray(`   ${videoIds.length} songs ready to play`));

  // Save playlist if --save flag is set
  if (options.save) {
    const saved = savePlaylist(prompt, songs, playlistUrl);
    console.log();
    console.log(chalk.green(`💾 Playlist saved! ID: ${chalk.bold(saved.id)}`));
    console.log(chalk.gray(`   Replay anytime: mx-lite play ${saved.id}`));
  }
}
