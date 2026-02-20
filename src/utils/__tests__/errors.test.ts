import { describe, it, expect } from 'vitest';
import {
  MixarooError,
  ConfigError,
  APIKeyError,
  RateLimitError,
  NetworkError,
  ValidationError,
  YouTubeError,
  parseAPIError,
} from '../errors.js';

describe('Error classes', () => {
  it('MixarooError stores all fields', () => {
    const err = new MixarooError('internal', 'user-facing', 'try this', ['cmd1']);
    expect(err.message).toBe('internal');
    expect(err.userMessage).toBe('user-facing');
    expect(err.suggestion).toBe('try this');
    expect(err.commands).toEqual(['cmd1']);
    expect(err.name).toBe('MixarooError');
  });

  it('ConfigError has sensible defaults', () => {
    const err = new ConfigError('bad config');
    expect(err.name).toBe('ConfigError');
    expect(err.suggestion).toContain('mx-lite setup');
    expect(err.commands).toContain('mx-lite setup');
  });

  it('APIKeyError includes key URL for known provider', () => {
    const err = new APIKeyError('openai');
    expect(err.name).toBe('APIKeyError');
    expect(err.suggestion).toBeDefined();
  });

  it('RateLimitError shows retry seconds when provided', () => {
    const err = new RateLimitError(30);
    expect(err.suggestion).toContain('30');
  });

  it('RateLimitError handles no retry time', () => {
    const err = new RateLimitError();
    expect(err.suggestion).toContain('few minutes');
  });

  it('NetworkError has default message', () => {
    const err = new NetworkError();
    expect(err.message).toBe('Network connection failed');
  });

  it('ValidationError passes message through', () => {
    const err = new ValidationError('bad input', 'fix it');
    expect(err.userMessage).toBe('bad input');
    expect(err.suggestion).toBe('fix it');
  });

  it('YouTubeError sets correct name', () => {
    const err = new YouTubeError('search failed');
    expect(err.name).toBe('YouTubeError');
  });
});

describe('parseAPIError', () => {
  it('returns MixarooError as-is', () => {
    const original = new NetworkError();
    expect(parseAPIError(original)).toBe(original);
  });

  it('detects 401 as APIKeyError', () => {
    const result = parseAPIError(new Error('Request failed with status 401'));
    expect(result).toBeInstanceOf(APIKeyError);
  });

  it('detects 429 as RateLimitError', () => {
    const result = parseAPIError(new Error('429 Too Many Requests'));
    expect(result).toBeInstanceOf(RateLimitError);
  });

  it('extracts retry-after seconds', () => {
    const result = parseAPIError(new Error('rate limit, retry after 60 seconds'));
    expect(result).toBeInstanceOf(RateLimitError);
    expect(result.suggestion).toContain('60');
  });

  it('detects network errors', () => {
    const result = parseAPIError(new Error('getaddrinfo ENOTFOUND api.openai.com'));
    expect(result).toBeInstanceOf(NetworkError);
  });

  it('falls back to generic MixarooError', () => {
    const result = parseAPIError(new Error('something weird'));
    expect(result).toBeInstanceOf(MixarooError);
  });
});
