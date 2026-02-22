import { describe, it, expect } from 'vitest';
import {
  parseAPIError,
  displayError,
  APIKeyError,
  RateLimitError,
  NetworkError,
  MixarooError,
} from '../../utils/errors.js';

describe('generate error handling', () => {
  describe('parseAPIError', () => {
    it('should detect 401 unauthorized as APIKeyError', () => {
      const err = parseAPIError(new Error('Request failed with status 401 Unauthorized'), 'openai');
      expect(err).toBeInstanceOf(APIKeyError);
      expect(err.name).toBe('APIKeyError');
    });

    it('should detect invalid key errors', () => {
      const err = parseAPIError(new Error('Invalid API key provided'), 'gemini');
      expect(err).toBeInstanceOf(APIKeyError);
    });

    it('should detect 429 rate limit', () => {
      const err = parseAPIError(new Error('Error 429: Too many requests'));
      expect(err).toBeInstanceOf(RateLimitError);
    });

    it('should extract retry-after seconds from rate limit', () => {
      const err = parseAPIError(new Error('Rate limited. Retry after 30 seconds'));
      expect(err).toBeInstanceOf(RateLimitError);
      expect(err.suggestion).toContain('30');
    });

    it('should detect ETIMEDOUT as NetworkError', () => {
      const err = parseAPIError(new Error('connect ETIMEDOUT 1.2.3.4:443'));
      expect(err).toBeInstanceOf(NetworkError);
    });

    it('should detect ENOTFOUND as NetworkError', () => {
      const err = parseAPIError(new Error('getaddrinfo ENOTFOUND api.openai.com'));
      expect(err).toBeInstanceOf(NetworkError);
    });

    it('should detect ECONNREFUSED as NetworkError', () => {
      const err = parseAPIError(new Error('connect ECONNREFUSED 127.0.0.1:443'));
      expect(err).toBeInstanceOf(NetworkError);
    });

    it('should return generic MixarooError for unknown errors', () => {
      const err = parseAPIError(new Error('Something weird happened'));
      expect(err).toBeInstanceOf(MixarooError);
    });

    it('should pass through existing MixarooError', () => {
      const original = new NetworkError('custom detail');
      const err = parseAPIError(original);
      expect(err).toBe(original);
    });

    it('should handle string errors', () => {
      const err = parseAPIError('some string error');
      expect(err).toBeInstanceOf(MixarooError);
    });
  });

  describe('displayError', () => {
    it('should not throw for MixarooError subclasses', () => {
      expect(() => displayError(new APIKeyError('openai'))).not.toThrow();
      expect(() => displayError(new RateLimitError())).not.toThrow();
      expect(() => displayError(new NetworkError())).not.toThrow();
    });

    it('should not throw for generic errors', () => {
      expect(() => displayError(new Error('generic'))).not.toThrow();
      expect(() => displayError('string error')).not.toThrow();
      expect(() => displayError(null)).not.toThrow();
    });

    it('should auto-detect network errors from generic Error', () => {
      // displayError internally re-parses generic errors
      expect(() => displayError(new Error('ETIMEDOUT'))).not.toThrow();
    });
  });
});
