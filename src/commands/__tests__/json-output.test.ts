import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..', '..');

describe('--json flag', () => {
  it('should show --json in root CLI help output', () => {
    const out = execSync('node dist/cli.js --help', { cwd: ROOT, encoding: 'utf-8' });
    expect(out).toContain('--json');
    expect(out).toContain('-j');
  });

  it('should show --json described as JSON output for scripting', () => {
    const out = execSync('node dist/cli.js --help', { cwd: ROOT, encoding: 'utf-8' });
    expect(out).toMatch(/--json.*JSON/i);
  });

  it('should have -j as short flag', () => {
    const out = execSync('node dist/cli.js --help', { cwd: ROOT, encoding: 'utf-8' });
    expect(out).toContain('-j, --json');
  });

  it('config show --json outputs valid JSON', () => {
    const out = execSync('node dist/cli.js config show --json', { cwd: ROOT, encoding: 'utf-8' });
    const json = JSON.parse(out);
    expect(json).toHaveProperty('configured');
    expect(json).toHaveProperty('defaultLength');
    expect(json).toHaveProperty('configPath');
  });
});
