import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import {
  isConfigured,
  getProvider,
  setProvider,
  setApiKey,
  getConfigPath,
  PROVIDER_INFO,
  AIProvider
} from '../services/config.js';
import { validateApiKey } from '../services/ai.js';

interface ProviderChoice {
  name: string;
  value: AIProvider;
}

const providerChoices: ProviderChoice[] = [
  { name: `OpenAI (${PROVIDER_INFO.openai.model})`, value: 'openai' },
  { name: `Google Gemini (${PROVIDER_INFO.gemini.model})`, value: 'gemini' },
  { name: `Anthropic Claude (${PROVIDER_INFO.anthropic.model})`, value: 'anthropic' }
];

export async function setupCommand(): Promise<void> {
  console.log(chalk.blue('🎵 mixaroo-lite Setup'));
  console.log();

  // Check if already configured
  if (isConfigured()) {
    const currentProvider = getProvider();
    const providerInfo = currentProvider ? PROVIDER_INFO[currentProvider] : null;

    console.log(chalk.yellow('You already have a configuration:'));
    console.log(`   Provider: ${chalk.cyan(providerInfo?.name || 'Unknown')}`);
    console.log();

    const { reconfigure } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'reconfigure',
        message: 'Would you like to reconfigure?',
        default: false
      }
    ]);

    if (!reconfigure) {
      console.log(chalk.gray('Setup cancelled.'));
      return;
    }
    console.log();
  }

  // Select provider
  const { provider } = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Select your AI provider:',
      choices: providerChoices
    }
  ]);

  const selectedProviderInfo = PROVIDER_INFO[provider as AIProvider];

  console.log();
  console.log(chalk.gray(`Get your API key at: ${chalk.underline(selectedProviderInfo.keyUrl)}`));
  console.log();

  // Enter API key with retry loop
  let validated = false;
  let apiKey = '';

  while (!validated) {
    const { key } = await inquirer.prompt([
      {
        type: 'password',
        name: 'key',
        message: 'Enter your API key:',
        mask: '*',
        validate: (input: string) => {
          if (!input || input.trim().length === 0) {
            return 'API key cannot be empty';
          }
          return true;
        }
      }
    ]);

    apiKey = key.trim();

    // Validate API key
    const spinner = ora('Validating API key...').start();

    try {
      const isValid = await validateApiKey(provider as AIProvider, apiKey);

      if (isValid) {
        spinner.succeed('API key validated successfully!');
        validated = true;
      } else {
        spinner.fail('Invalid API key');
        console.log();
        console.log(chalk.red('❌ The API key appears to be invalid.'));
        console.log();
        console.log(chalk.yellow('💡 Troubleshooting tips:'));
        console.log(`   • Make sure you copied the entire key`);
        console.log(`   • Check that the key hasn't expired`);
        console.log(`   • Get a new key at: ${chalk.underline(selectedProviderInfo.keyUrl)}`);
        console.log();

        const { retry } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'retry',
            message: 'Would you like to try again?',
            default: true
          }
        ]);

        if (!retry) {
          console.log(chalk.gray('Setup cancelled.'));
          return;
        }
        console.log();
      }
    } catch (_error) {
      spinner.fail('Validation failed');
      console.log();
      console.log(chalk.red('❌ Could not validate API key. There may be a network issue.'));
      console.log();

      const { retry } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'retry',
          message: 'Would you like to try again?',
          default: true
        }
      ]);

      if (!retry) {
        console.log(chalk.gray('Setup cancelled.'));
        return;
      }
      console.log();
    }
  }

  // Save configuration
  setProvider(provider as AIProvider);
  await setApiKey(apiKey);

  // Success message
  console.log();
  console.log(chalk.green('✓ Configuration saved successfully!'));
  console.log();
  console.log(chalk.bold('🎉 You\'re all set! Try generating a playlist:'));
  console.log();
  console.log(chalk.cyan('   mx-lite "upbeat 90s rock for a road trip"'));
  console.log(chalk.cyan('   mx-lite "chill lo-fi beats for studying" --length 50'));
  console.log(chalk.cyan('   mx-lite "workout motivation hits"'));
  console.log();
  console.log(chalk.gray(`Config saved to: ${getConfigPath()}`));
}
