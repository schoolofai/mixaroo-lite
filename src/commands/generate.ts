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

interface GenerateOptions {
  length: string;
  provider?: string;
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

  let songs: Song[];
  try {
    const aiService = getAIService(provider, apiKey);
    songs = await aiService.generatePlaylist(prompt, length);
    aiSpinner.succeed(`Generated ${songs.length} songs`);
  } catch (error) {
    aiSpinner.fail('Failed to generate playlist');
    console.log();
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('401') || errorMessage.includes('invalid') || errorMessage.includes('unauthorized')) {
      console.error(chalk.red('❌ Invalid API key'));
      console.log();
      console.log(chalk.yellow('💡 Your API key may be invalid or expired.'));
      console.log(`   Get a new key at: ${chalk.underline(providerInfo.keyUrl)}`);
      console.log(`   Then run: ${chalk.cyan('mx-lite setup')}`);
    } else if (errorMessage.includes('429') || errorMessage.includes('rate')) {
      console.error(chalk.red('❌ Rate limit exceeded'));
      console.log();
      console.log(chalk.yellow('💡 You\'ve hit the API rate limit. Please wait a moment and try again.'));
    } else {
      console.error(chalk.red('❌ Error generating playlist:'), errorMessage);
    }
    
    process.exit(1);
  }

  // Search YouTube for songs
  console.log();
  const ytSpinner = ora('Searching YouTube...').start();

  let results: SearchResult[];
  try {
    results = await searchSongs(songs, (current, total, song, _found) => {
      ytSpinner.text = `Searching YouTube... (${current}/${total}) ${song.title}`;
    });
    ytSpinner.succeed('YouTube search complete');
  } catch (error) {
    ytSpinner.fail('YouTube search failed');
    console.error(chalk.red('❌ Error searching YouTube:'), error instanceof Error ? error.message : String(error));
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

  console.log();
  console.log(chalk.bold('▶️  Play your playlist:'));
  console.log();
  console.log(chalk.cyan(`   ${playlistUrl}`));
  console.log();
  console.log(chalk.gray(`   ${videoIds.length} songs ready to play`));
}
