import chalk from 'chalk';
import inquirer from 'inquirer';
import {
  getConfig,
  getConfigPath,
  getConfigDir,
  clearConfig,
  setDefaultLength,
  maskApiKey,
  getProviderInfo,
  isConfigured
} from '../services/config.js';

export const configCommand = {
  async show(options: { json?: boolean }): Promise<void> {
    const config = getConfig();
    const providerInfo = getProviderInfo(config.provider);

    if (options.json) {
      // JSON output for scripting (mask the API key)
      console.log(JSON.stringify({
        configured: isConfigured(),
        provider: config.provider || null,
        providerName: providerInfo?.name || null,
        model: providerInfo?.model || null,
        apiKeySet: !!config.apiKey,
        defaultLength: config.defaultLength,
        configPath: getConfigPath()
      }, null, 2));
      return;
    }

    console.log(chalk.blue('⚙️  mixaroo-lite Configuration'));
    console.log();

    if (config.provider && providerInfo) {
      console.log(`   Provider:       ${chalk.green(providerInfo.name)} (${providerInfo.model})`);
    } else {
      console.log(`   Provider:       ${chalk.yellow('Not configured')}`);
    }

    console.log(`   API Key:        ${config.apiKey ? chalk.green(maskApiKey(config.apiKey)) : chalk.yellow('Not set')}`);
    console.log(`   Default Length: ${config.defaultLength}`);
    console.log();
    console.log(`   Config Location: ${chalk.gray(getConfigPath())}`);

    if (!isConfigured()) {
      console.log();
      console.log(chalk.yellow('💡 Run `mx-lite setup` to configure your AI provider'));
    }
  },

  async reset(): Promise<void> {
    console.log(chalk.blue('🔄 Reset Configuration'));
    console.log();

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to reset all configuration? This will delete your API key.',
        default: false
      }
    ]);

    if (!confirm) {
      console.log(chalk.gray('Reset cancelled.'));
      return;
    }

    clearConfig();
    console.log(chalk.green('✓ Configuration reset successfully.'));
    console.log();
    console.log(`Run ${chalk.cyan('mx-lite setup')} to configure a new provider.`);
  },

  async path(): Promise<void> {
    console.log(getConfigDir());
  },

  async set(key: string, value: string): Promise<void> {
    const validKeys = ['default-length'];

    if (!validKeys.includes(key)) {
      console.error(chalk.red(`❌ Unknown configuration key: ${key}`));
      console.log();
      console.log('Valid keys:');
      console.log(`  ${chalk.cyan('default-length')} <number>  Set default playlist length (1-100)`);
      process.exit(1);
    }

    switch (key) {
      case 'default-length': {
        const length = parseInt(value, 10);
        if (isNaN(length) || length < 1 || length > 100) {
          console.error(chalk.red('❌ Default length must be a number between 1 and 100'));
          process.exit(1);
        }
        setDefaultLength(length);
        console.log(chalk.green(`✓ Default length set to ${length}`));
        break;
      }
    }
  }
};
