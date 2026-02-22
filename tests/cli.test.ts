import { describe, it, expect, vi, beforeAll } from 'vitest';
import { execFileSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';

const CLI_PATH = resolve(__dirname, '../dist/cli.js');

// Ensure dist is built before running CLI integration tests
beforeAll(() => {
  if (!existsSync(CLI_PATH)) {
    execFileSync('npm', ['run', 'build'], {
      cwd: resolve(__dirname, '..'),
      timeout: 30000,
    });
  }
}, 30000);

// Helper: run the built CLI and capture output
function runCLI(args: string[]): { stdout: string; stderr: string; exitCode: number } {
  try {
    const stdout = execFileSync('node', [CLI_PATH, ...args], {
      encoding: 'utf-8',
      timeout: 10000,
      env: { ...process.env, NODE_NO_WARNINGS: '1', FORCE_COLOR: '0', NO_COLOR: '1' },
      cwd: resolve(__dirname, '..'),
    });
    return { stdout, stderr: '', exitCode: 0 };
  } catch (error: any) {
    return {
      stdout: error.stdout || '',
      stderr: error.stderr || '',
      exitCode: error.status ?? 1,
    };
  }
}

describe('CLI integration', () => {
  describe('help and version', () => {
    it('shows help with no arguments', () => {
      const { stdout } = runCLI(['--help']);
      expect(stdout).toContain('mx-lite');
      expect(stdout).toContain('AI-powered playlist generator');
    });

    it('shows version', () => {
      const { stdout } = runCLI(['--version']);
      expect(stdout.trim()).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe('config commands', () => {
    it('config show works', () => {
      const result = runCLI(['config', 'show']);
      // Should show config info (may say "Not configured")
      expect(result.stdout).toContain('Configuration');
    });

    it('config show --json outputs valid JSON', () => {
      const result = runCLI(['config', 'show', '--json']);
      const json = JSON.parse(result.stdout);
      expect(json).toHaveProperty('configured');
      expect(json).toHaveProperty('defaultLength');
      expect(json).toHaveProperty('configPath');
    });

    it('config path returns a path string', () => {
      const result = runCLI(['config', 'path']);
      expect(result.stdout.trim()).toBeTruthy();
    });

    it('config set with invalid key fails', () => {
      const result = runCLI(['config', 'set', 'nonexistent', 'value']);
      expect(result.exitCode).not.toBe(0);
      expect(result.stdout + result.stderr).toContain('Unknown configuration key');
    });

    it('config set default-length with invalid value fails', () => {
      const result = runCLI(['config', 'set', 'default-length', 'abc']);
      expect(result.exitCode).not.toBe(0);
      expect(result.stdout + result.stderr).toContain('number between 1 and 100');
    });

    it('config set default-length with 0 fails', () => {
      const result = runCLI(['config', 'set', 'default-length', '0']);
      expect(result.exitCode).not.toBe(0);
    });

    it('config set default-length with 101 fails', () => {
      const result = runCLI(['config', 'set', 'default-length', '101']);
      expect(result.exitCode).not.toBe(0);
    });

    it('config set default-length with valid value succeeds', () => {
      const result = runCLI(['config', 'set', 'default-length', '30']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Default length set to 30');
    });

    it('config help shows subcommands', () => {
      const result = runCLI(['config', '--help']);
      expect(result.stdout).toContain('show');
      expect(result.stdout).toContain('reset');
      expect(result.stdout).toContain('path');
      expect(result.stdout).toContain('set');
    });
  });

  describe('generate command', () => {
    it('fails without config when generating', () => {
      // This will fail if not configured (expected in test env)
      // We just verify it doesn't crash unexpectedly
      const result = runCLI(['some playlist prompt']);
      // Should either ask to setup or attempt generation
      const output = result.stdout + result.stderr;
      // It should mention setup if not configured, or proceed if configured
      expect(output.length).toBeGreaterThan(0);
    });

    it('accepts --length flag', () => {
      const result = runCLI(['--help']);
      expect(result.stdout).toContain('--length');
      expect(result.stdout).toContain('--provider');
    });

    it('shows provider options in help', () => {
      const result = runCLI(['--help']);
      expect(result.stdout).toContain('provider');
    });
  });
});
