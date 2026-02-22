import { describe, it, expect, vi, beforeEach } from 'vitest';

// Must use hoisted to avoid TDZ issues with vi.mock hoisting
const { mockStore, mockConfInstance } = vi.hoisted(() => {
  const mockStore = new Map<string, any>();
  const mockConfInstance = {
    get: vi.fn((key: string) => mockStore.get(key)),
    set: vi.fn((key: string, value: any) => mockStore.set(key, value)),
    clear: vi.fn(() => mockStore.clear()),
    path: '/mock/config/path/config.json',
  };
  return { mockStore, mockConfInstance };
});

vi.mock('conf', () => {
  return {
    default: vi.fn().mockImplementation(() => mockConfInstance),
  };
});

vi.mock('fs/promises', () => ({
  chmod: vi.fn().mockResolvedValue(undefined),
  stat: vi.fn().mockResolvedValue({}),
}));

import {
  getConfig,
  isConfigured,
  getProvider,
  getApiKey,
  getDefaultLength,
  setProvider,
  setApiKey,
  setDefaultLength,
  clearConfig,
  getConfigPath,
  getConfigDir,
  maskApiKey,
  getProviderInfo,
  PROVIDER_INFO,
} from '../src/services/config.js';
import type { AIProvider } from '../src/services/config.js';
import { chmod } from 'fs/promises';

describe('config service', () => {
  beforeEach(() => {
    mockStore.clear();
    vi.clearAllMocks();
    // Set default
    mockStore.set('defaultLength', 25);
  });

  describe('getConfig', () => {
    it('returns default config when nothing is set', () => {
      mockStore.delete('provider');
      mockStore.delete('apiKey');
      const cfg = getConfig();
      expect(cfg).toEqual({
        provider: undefined,
        apiKey: undefined,
        defaultLength: 25,
      });
    });

    it('returns full config when all values set', () => {
      mockStore.set('provider', 'openai');
      mockStore.set('apiKey', 'sk-test123');
      mockStore.set('defaultLength', 50);
      const cfg = getConfig();
      expect(cfg.provider).toBe('openai');
      expect(cfg.apiKey).toBe('sk-test123');
      expect(cfg.defaultLength).toBe(50);
    });
  });

  describe('isConfigured', () => {
    it('returns false when no provider or key', () => {
      expect(isConfigured()).toBe(false);
    });

    it('returns false when only provider set', () => {
      mockStore.set('provider', 'openai');
      expect(isConfigured()).toBe(false);
    });

    it('returns false when only apiKey set', () => {
      mockStore.set('apiKey', 'sk-test');
      expect(isConfigured()).toBe(false);
    });

    it('returns true when both provider and apiKey set', () => {
      mockStore.set('provider', 'gemini');
      mockStore.set('apiKey', 'key-123');
      expect(isConfigured()).toBe(true);
    });
  });

  describe('getProvider / setProvider', () => {
    it('returns undefined when not set', () => {
      expect(getProvider()).toBeUndefined();
    });

    it('sets and gets provider', () => {
      setProvider('anthropic');
      expect(mockConfInstance.set).toHaveBeenCalledWith('provider', 'anthropic');
    });

    it('works for all valid providers', () => {
      const providers: AIProvider[] = ['openai', 'gemini', 'anthropic'];
      for (const p of providers) {
        setProvider(p);
        expect(mockConfInstance.set).toHaveBeenCalledWith('provider', p);
      }
    });
  });

  describe('getApiKey / setApiKey', () => {
    it('returns undefined when not set', () => {
      expect(getApiKey()).toBeUndefined();
    });

    it('sets api key and tries to chmod config file', async () => {
      await setApiKey('sk-newkey');
      expect(mockConfInstance.set).toHaveBeenCalledWith('apiKey', 'sk-newkey');
      expect(chmod).toHaveBeenCalledWith('/mock/config/path/config.json', 0o600);
    });

    it('handles chmod failure gracefully', async () => {
      vi.mocked(chmod).mockRejectedValueOnce(new Error('EPERM'));
      // Should not throw
      await expect(setApiKey('sk-test')).resolves.toBeUndefined();
    });
  });

  describe('getDefaultLength / setDefaultLength', () => {
    it('returns default length', () => {
      expect(getDefaultLength()).toBe(25);
    });

    it('sets valid length', () => {
      setDefaultLength(50);
      expect(mockConfInstance.set).toHaveBeenCalledWith('defaultLength', 50);
    });

    it('accepts boundary value 1', () => {
      setDefaultLength(1);
      expect(mockConfInstance.set).toHaveBeenCalledWith('defaultLength', 1);
    });

    it('accepts boundary value 100', () => {
      setDefaultLength(100);
      expect(mockConfInstance.set).toHaveBeenCalledWith('defaultLength', 100);
    });

    it('throws for 0', () => {
      expect(() => setDefaultLength(0)).toThrow('Default length must be between 1 and 100');
    });

    it('throws for negative', () => {
      expect(() => setDefaultLength(-5)).toThrow('Default length must be between 1 and 100');
    });

    it('throws for 101', () => {
      expect(() => setDefaultLength(101)).toThrow('Default length must be between 1 and 100');
    });

    it('throws for very large number', () => {
      expect(() => setDefaultLength(999)).toThrow('Default length must be between 1 and 100');
    });
  });

  describe('clearConfig', () => {
    it('calls conf clear', () => {
      clearConfig();
      expect(mockConfInstance.clear).toHaveBeenCalled();
    });
  });

  describe('getConfigPath', () => {
    it('returns config file path', () => {
      expect(getConfigPath()).toBe('/mock/config/path/config.json');
    });
  });

  describe('getConfigDir', () => {
    it('returns config directory', () => {
      expect(getConfigDir()).toBe('/mock/config/path');
    });
  });

  describe('maskApiKey', () => {
    it('returns "Not set" for undefined', () => {
      expect(maskApiKey(undefined)).toBe('Not set');
    });

    it('returns "****" for empty string', () => {
      expect(maskApiKey('')).toBe('Not set');
    });

    it('returns "****" for key with 1 char', () => {
      expect(maskApiKey('a')).toBe('****');
    });

    it('returns "****" for key with exactly 4 chars', () => {
      expect(maskApiKey('abcd')).toBe('****');
    });

    it('shows first 4 chars + **** for 5+ char key', () => {
      expect(maskApiKey('abcde')).toBe('abcd****');
    });

    it('masks a typical OpenAI key', () => {
      expect(maskApiKey('sk-abc123def456')).toBe('sk-a****');
    });

    it('masks a long key correctly', () => {
      const longKey = 'a'.repeat(100);
      expect(maskApiKey(longKey)).toBe('aaaa****');
    });
  });

  describe('getProviderInfo', () => {
    it('returns undefined for undefined provider', () => {
      expect(getProviderInfo(undefined)).toBeUndefined();
    });

    it('returns info for openai', () => {
      const info = getProviderInfo('openai');
      expect(info).toBeDefined();
      expect(info!.name).toBe('OpenAI');
      expect(info!.model).toBeTruthy();
      expect(info!.keyUrl).toMatch(/^https:\/\//);
    });

    it('returns info for gemini', () => {
      const info = getProviderInfo('gemini');
      expect(info!.name).toBe('Google Gemini');
    });

    it('returns info for anthropic', () => {
      const info = getProviderInfo('anthropic');
      expect(info!.name).toBe('Anthropic Claude');
    });
  });

  describe('PROVIDER_INFO', () => {
    it('has entries for all three providers', () => {
      expect(Object.keys(PROVIDER_INFO)).toHaveLength(3);
      expect(PROVIDER_INFO).toHaveProperty('openai');
      expect(PROVIDER_INFO).toHaveProperty('gemini');
      expect(PROVIDER_INFO).toHaveProperty('anthropic');
    });

    it('all entries have required fields', () => {
      for (const [, info] of Object.entries(PROVIDER_INFO)) {
        expect(info.name).toBeTruthy();
        expect(info.model).toBeTruthy();
        expect(info.keyUrl).toMatch(/^https:\/\//);
      }
    });
  });
});
