import Conf from 'conf';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { chmod, stat } from 'fs/promises';

// Provider types
export type AIProvider = 'openai' | 'gemini' | 'anthropic';

// Config schema
export interface AppConfig {
  provider?: AIProvider;
  apiKey?: string;
  defaultLength: number;
}

// Provider display names and info
export const PROVIDER_INFO: Record<AIProvider, { name: string; model: string; keyUrl: string }> = {
  openai: {
    name: 'OpenAI',
    model: 'gpt-4o-mini',
    keyUrl: 'https://platform.openai.com/api-keys'
  },
  gemini: {
    name: 'Google Gemini',
    model: 'gemini-1.5-flash',
    keyUrl: 'https://makersuite.google.com/app/apikey'
  },
  anthropic: {
    name: 'Anthropic Claude',
    model: 'claude-3-haiku',
    keyUrl: 'https://console.anthropic.com/'
  }
};

// Initialize conf with schema
const config = new Conf<AppConfig>({
  projectName: 'mixaroo-lite',
  defaults: {
    defaultLength: 25
  },
  schema: {
    provider: {
      type: 'string',
      enum: ['openai', 'gemini', 'anthropic']
    },
    apiKey: {
      type: 'string'
    },
    defaultLength: {
      type: 'number',
      minimum: 1,
      maximum: 100,
      default: 25
    }
  }
});

/**
 * Get the full configuration
 */
export function getConfig(): AppConfig {
  return {
    provider: config.get('provider'),
    apiKey: config.get('apiKey'),
    defaultLength: config.get('defaultLength')
  };
}

/**
 * Check if the app is configured with a provider and API key
 */
export function isConfigured(): boolean {
  return !!(config.get('provider') && config.get('apiKey'));
}

/**
 * Get the configured provider
 */
export function getProvider(): AIProvider | undefined {
  return config.get('provider');
}

/**
 * Get the configured API key
 */
export function getApiKey(): string | undefined {
  return config.get('apiKey');
}

/**
 * Get the default playlist length
 */
export function getDefaultLength(): number {
  return config.get('defaultLength');
}

/**
 * Set the AI provider
 */
export function setProvider(provider: AIProvider): void {
  config.set('provider', provider);
}

/**
 * Securely store the API key
 * Note: conf stores in ~/.config/mixaroo-lite/
 * For additional security, we try to set restrictive file permissions
 */
export async function setApiKey(key: string): Promise<void> {
  config.set('apiKey', key);
  
  // Try to set restrictive permissions on config file (owner read/write only)
  try {
    const configPath = config.path;
    await chmod(configPath, 0o600);
  } catch {
    // Ignore permission errors (Windows, etc.)
  }
}

/**
 * Set the default playlist length
 */
export function setDefaultLength(length: number): void {
  if (length < 1 || length > 100) {
    throw new Error('Default length must be between 1 and 100');
  }
  config.set('defaultLength', length);
}

/**
 * Clear all configuration
 */
export function clearConfig(): void {
  config.clear();
}

/**
 * Get the configuration file path
 */
export function getConfigPath(): string {
  return config.path;
}

/**
 * Get the configuration directory path
 */
export function getConfigDir(): string {
  return dirname(config.path);
}

/**
 * Mask an API key for display (show first 4 chars + ****)
 */
export function maskApiKey(key: string | undefined): string {
  if (!key) return 'Not set';
  if (key.length <= 4) return '****';
  return key.substring(0, 4) + '****';
}

/**
 * Get provider info for display
 */
export function getProviderInfo(provider: AIProvider | undefined): { name: string; model: string; keyUrl: string } | undefined {
  if (!provider) return undefined;
  return PROVIDER_INFO[provider];
}
