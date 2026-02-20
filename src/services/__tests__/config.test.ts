import { describe, it, expect } from 'vitest';
import { maskApiKey, PROVIDER_INFO } from '../config.js';
import type { AIProvider } from '../config.js';

describe('maskApiKey', () => {
  it('masks a normal key', () => {
    expect(maskApiKey('sk-abc123def456')).toBe('sk-a****');
  });

  it('handles undefined', () => {
    expect(maskApiKey(undefined)).toBe('Not set');
  });

  it('handles short key', () => {
    expect(maskApiKey('abc')).toBe('****');
  });

  it('handles exactly 4 chars', () => {
    expect(maskApiKey('abcd')).toBe('****');
  });

  it('handles 5 chars', () => {
    expect(maskApiKey('abcde')).toBe('abcd****');
  });
});

describe('PROVIDER_INFO', () => {
  const providers: AIProvider[] = ['openai', 'gemini', 'anthropic'];

  it('has info for all providers', () => {
    for (const p of providers) {
      expect(PROVIDER_INFO[p]).toBeDefined();
      expect(PROVIDER_INFO[p].name).toBeTruthy();
      expect(PROVIDER_INFO[p].model).toBeTruthy();
      expect(PROVIDER_INFO[p].keyUrl).toMatch(/^https:\/\//);
    }
  });
});
