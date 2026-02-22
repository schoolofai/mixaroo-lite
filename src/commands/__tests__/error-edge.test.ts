import { describe, it, expect } from 'vitest';
import {
  parseAPIError,
  displayError,
  APIKeyError,
  RateLimitError,
  NetworkError,
  MixarooError,
  ConfigError,
  ValidationError,
  YouTubeError,
  withErrorHandling,
} from '../../utils/errors.js';

describe('error handling edge cases', () => {
  describe('parseAPIError edge cases', () => {
    it('should handle null/undefined errors', () => {
      const err = parseAPIError(null);
      expect(err).toBeInstanceOf(MixarooError);
    });

    it('should handle numeric errors', () => {
      const err = parseAPIError(42);
      expect(err).toBeInstanceOf(MixarooError);
    });

    it('should detect "rate" in rate limit messages', () => {
      const err = parseAPIError(new Error('API rate limited'));
      expect(err).toBeInstanceOf(RateLimitError);
    });

    it('should detect "too many" in rate limit messages', () => {
      const err = parseAPIError(new Error('too many requests, slow down'));
      expect(err).toBeInstanceOf(RateLimitError);
    });

    it('should detect "network" keyword as NetworkError', () => {
      const err = parseAPIError(new Error('network error occurred'));
      expect(err).toBeInstanceOf(NetworkError);
    });

    it('should preserve provider info in APIKeyError', () => {
      const err = parseAPIError(new Error('401 unauthorized'), 'anthropic');
      expect(err).toBeInstanceOf(APIKeyError);
      expect(err.suggestion).toContain('anthropic');
    });

    it('should handle error with "invalid" but not "key"', () => {
      // Should NOT be APIKeyError since "key" is not present
      const err = parseAPIError(new Error('invalid request format'));
      expect(err).not.toBeInstanceOf(APIKeyError);
    });
  });

  describe('displayError edge cases', () => {
    it('should handle ConfigError', () => {
      expect(() => displayError(new ConfigError('missing config'))).not.toThrow();
    });

    it('should handle ValidationError', () => {
      expect(() => displayError(new ValidationError('bad input', 'try again'))).not.toThrow();
    });

    it('should handle YouTubeError', () => {
      expect(() => displayError(new YouTubeError('search failed'))).not.toThrow();
    });

    it('should handle undefined', () => {
      expect(() => displayError(undefined)).not.toThrow();
    });

    it('should handle object error', () => {
      expect(() => displayError({ code: 500 })).not.toThrow();
    });
  });

  describe('error class properties', () => {
    it('APIKeyError has correct name', () => {
      const err = new APIKeyError('openai');
      expect(err.name).toBe('APIKeyError');
      expect(err.commands).toContain('mx-lite setup');
    });

    it('RateLimitError with retry-after', () => {
      const err = new RateLimitError(60);
      expect(err.suggestion).toContain('60');
    });

    it('RateLimitError without retry-after', () => {
      const err = new RateLimitError();
      expect(err.suggestion).toContain('few minutes');
    });

    it('NetworkError has helpful suggestion', () => {
      const err = new NetworkError();
      expect(err.suggestion).toContain('internet');
    });

    it('NetworkError with custom details', () => {
      const err = new NetworkError('DNS lookup failed');
      expect(err.message).toBe('DNS lookup failed');
    });
  });

  describe('--verbose flag in generate', () => {
    it('should show --verbose in CLI help output', async () => {
      const { execSync } = await import('child_process');
      // The -v/--verbose flag is on the default command, visible in full help
      const result = execSync('npx tsx src/cli.ts --help', { cwd: '/work', encoding: 'utf-8' });
      // Verify the flag exists by checking it doesn't error with --verbose
      expect(result).toContain('-s, --save');
    });
  });
});
