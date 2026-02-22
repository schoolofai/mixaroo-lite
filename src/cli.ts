#!/usr/bin/env node

import { Command } from 'commander';

import { setupCommand } from './commands/setup.js';
import { generateCommand } from './commands/generate.js';
import { configCommand } from './commands/config.js';
import { listCommand } from './commands/list.js';
import { playCommand } from './commands/play.js';

const program = new Command();

program
  .name('mx-lite')
  .description('AI-powered playlist generator that creates YouTube playback links')
  .version('1.0.0');

// Setup command
program
  .command('setup')
  .description('Configure your AI provider and API key')
  .action(setupCommand);

// Config commands
const config = program
  .command('config')
  .description('Manage configuration');

config
  .command('show')
  .description('Display current configuration')
  .option('--json', 'Output as JSON')
  .action(configCommand.show);

config
  .command('reset')
  .description('Reset all configuration')
  .action(configCommand.reset);

config
  .command('path')
  .description('Show configuration file path')
  .action(configCommand.path);

config
  .command('set <key> <value>')
  .description('Set a configuration value')
  .action(configCommand.set);

// List saved playlists
program
  .command('list')
  .description('Show saved playlists')
  .action(listCommand);

// Play a saved playlist
program
  .command('play <id>')
  .description('Open a saved playlist by ID')
  .action(playCommand);

// Main generate command (default)
program
  .argument('[prompt]', 'Describe the playlist you want')
  .option('-l, --length <number>', 'Number of songs (1-100)', '25')
  .option('-p, --provider <provider>', 'Override AI provider (openai, gemini, anthropic)')
  .option('-s, --save', 'Save the playlist locally')
  .action(async (prompt, options) => {
    if (prompt) {
      await generateCommand(prompt, options);
    } else if (process.argv.length <= 2) {
      program.help();
    }
  });

// Parse and execute
program.parse();
