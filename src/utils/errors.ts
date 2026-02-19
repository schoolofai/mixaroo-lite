import chalk from 'chalk';
import { PROVIDER_INFO, AIProvider } from '../services/config.js';

// Base error class
export class MixarooError extends Error {
  constructor(
    message: string,
    public readonly userMessage: string,
    public readonly suggestion?: string,
    public readonly commands?: string[]
  ) {
    super(message);
    this.name = 'MixarooError';
  }
}

// Config-related errors
export class ConfigError extends MixarooError {
  constructor(message: string, suggestion?: string) {
    super(
      message,
      'Configuration issue',
      suggestion || 'Run mx-lite setup to configure your settings',
      ['mx-lite setup', 'mx-lite config show']
    );
    this.name = 'ConfigError';
  }
}

// API key errors
export class APIKeyError extends MixarooError {
  constructor(provider?: AIProvider) {
    const providerInfo = provider ? PROVIDER_INFO[provider] : null;
    const keyUrl = providerInfo?.keyUrl || 'your provider\'s website';
    
    super(
      'Invalid or expired API key',
      'Your API key is invalid or has expired',
      `Get a new API key at: ${keyUrl}`,
      ['mx-lite setup']
    );
    this.name = 'APIKeyError';
  }
}

// Rate limit errors
export class RateLimitError extends MixarooError {
  constructor(retryAfter?: number) {
    const waitMessage = retryAfter 
      ? `Wait ${retryAfter} seconds before trying again`
      : 'Wait a few minutes before trying again';
    
    super(
      'Rate limit exceeded',
      'You\'ve exceeded the API rate limit',
      waitMessage,
      []
    );
    this.name = 'RateLimitError';
  }
}

// Network errors
export class NetworkError extends MixarooError {
  constructor(details?: string) {
    super(
      details || 'Network connection failed',
      'Could not connect to the service',
      'Check your internet connection. If using a proxy or firewall, ensure it allows HTTPS connections.',
      []
    );
    this.name = 'NetworkError';
  }
}

// Validation errors
export class ValidationError extends MixarooError {
  constructor(message: string, suggestion?: string) {
    super(
      message,
      message,
      suggestion,
      []
    );
    this.name = 'ValidationError';
  }
}

// YouTube search errors
export class YouTubeError extends MixarooError {
  constructor(message: string) {
    super(
      message,
      'YouTube search failed',
      'This may be a temporary issue. Try again in a moment.',
      []
    );
    this.name = 'YouTubeError';
  }
}

/**
 * Format and display an error to the user
 */
export function displayError(error: unknown): void {
  console.log();

  if (error instanceof MixarooError) {
    console.log(chalk.red(`❌ Error: ${error.userMessage}`));
    
    if (error.message !== error.userMessage) {
      console.log();
      console.log(chalk.yellow('💡 What happened:'));
      console.log(`   ${error.message}`);
    }
    
    if (error.suggestion) {
      console.log();
      console.log(chalk.yellow('🔧 How to fix:'));
      console.log(`   ${error.suggestion}`);
    }
    
    if (error.commands && error.commands.length > 0) {
      console.log();
      console.log(chalk.yellow('📚 Commands to try:'));
      error.commands.forEach(cmd => {
        console.log(chalk.cyan(`   $ ${cmd}`));
      });
    }
  } else if (error instanceof Error) {
    // Parse common error patterns
    const message = error.message.toLowerCase();
    
    if (message.includes('401') || message.includes('unauthorized') || message.includes('invalid api key')) {
      displayError(new APIKeyError());
    } else if (message.includes('429') || message.includes('rate limit') || message.includes('too many requests')) {
      displayError(new RateLimitError());
    } else if (message.includes('enotfound') || message.includes('etimedout') || message.includes('econnrefused')) {
      displayError(new NetworkError());
    } else {
      // Generic error
      console.log(chalk.red(`❌ Error: ${error.message}`));
      
      // Show debug info if DEBUG is set
      if (process.env.DEBUG === 'true') {
        console.log();
        console.log(chalk.gray('Debug info:'));
        console.log(chalk.gray(error.stack || 'No stack trace'));
      }
    }
  } else {
    console.log(chalk.red(`❌ An unexpected error occurred`));
    console.log(chalk.gray(String(error)));
  }
  
  console.log();
}

/**
 * Parse API error responses and return appropriate error type
 */
export function parseAPIError(error: unknown, provider?: AIProvider): MixarooError {
  if (error instanceof MixarooError) {
    return error;
  }

  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  // Authentication errors
  if (message.includes('401') || message.includes('unauthorized') || message.includes('invalid') && message.includes('key')) {
    return new APIKeyError(provider);
  }

  // Rate limiting
  if (message.includes('429') || message.includes('rate') || message.includes('too many')) {
    // Try to extract retry-after
    const retryMatch = message.match(/(\d+)\s*(?:seconds?|s)/);
    const retryAfter = retryMatch ? parseInt(retryMatch[1], 10) : undefined;
    return new RateLimitError(retryAfter);
  }

  // Network errors
  if (message.includes('enotfound') || message.includes('etimedout') || message.includes('econnrefused') || message.includes('network')) {
    return new NetworkError();
  }

  // Default to generic error
  return new MixarooError(
    error instanceof Error ? error.message : String(error),
    'An error occurred while processing your request',
    'Please try again. If the problem persists, check your configuration.',
    ['mx-lite config show']
  );
}

/**
 * Wrap async function with error handling
 */
export function withErrorHandling<T>(fn: () => Promise<T>): Promise<T> {
  return fn().catch(error => {
    displayError(error);
    process.exit(1);
  });
}
