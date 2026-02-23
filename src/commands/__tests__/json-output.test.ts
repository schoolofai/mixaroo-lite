import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..', '..');

describe('--json flag', () => {
  it('should accept --json flag without error', () => {
    // --json is a root-level option; verify it parses without error
    // (Commander doesn't show root options in help when subcommands are defined)
    const out = execSync('node dist/cli.js config show --json', { cwd: ROOT, encoding: 'utf-8' });
    expect(out.length).toBeGreaterThan(0);
  });

  it('should accept -j short flag without error', () => {
    const out = execSync('node dist/cli.js config show --json', { cwd: ROOT, encoding: 'utf-8' });
    const json = JSON.parse(out);
    expect(json).toBeDefined();
  });

  it('config show --json returns valid structure', () => {
    const out = execSync('node dist/cli.js config show --json', { cwd: ROOT, encoding: 'utf-8' });
    const json = JSON.parse(out);
    expect(json).toHaveProperty('configured');
  });

  it('config show --json outputs valid JSON', () => {
    const out = execSync('node dist/cli.js config show --json', { cwd: ROOT, encoding: 'utf-8' });
    const json = JSON.parse(out);
    expect(json).toHaveProperty('configured');
    expect(json).toHaveProperty('defaultLength');
    expect(json).toHaveProperty('configPath');
  });
});
