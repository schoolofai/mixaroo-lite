import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', '..');

describe('npm package validation', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));

  describe('package.json fields', () => {
    it('has required fields', () => {
      expect(pkg.name).toBe('mixaroo-lite');
      expect(pkg.version).toMatch(/^\d+\.\d+\.\d+$/);
      expect(pkg.description).toBeTruthy();
      expect(pkg.license).toBe('MIT');
    });

    it('has correct bin entry', () => {
      expect(pkg.bin).toEqual({ 'mx-lite': 'dist/cli.js' });
    });

    it('has files field restricting to dist', () => {
      expect(pkg.files).toEqual([
        'dist/**/*.js',
        'dist/**/*.d.ts',
        '!dist/**/__tests__/**',
        '!dist/**/*.test.*',
      ]);
    });

    it('has engines field', () => {
      expect(pkg.engines?.node).toBeTruthy();
    });

    it('has type module', () => {
      expect(pkg.type).toBe('module');
    });

    it('has prepublishOnly script', () => {
      expect(pkg.scripts.prepublishOnly).toBe('npm run build');
    });

    it('has keywords', () => {
      expect(pkg.keywords).toBeInstanceOf(Array);
      expect(pkg.keywords.length).toBeGreaterThan(0);
    });
  });

  describe('build output', () => {
    it('dist/cli.js exists after build', () => {
      expect(existsSync(join(ROOT, 'dist', 'cli.js'))).toBe(true);
    });

    it('dist/cli.js has shebang', () => {
      const content = readFileSync(join(ROOT, 'dist', 'cli.js'), 'utf-8');
      expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
    });

    it('dist contains expected service modules', () => {
      expect(existsSync(join(ROOT, 'dist', 'services', 'ai.js'))).toBe(true);
      expect(existsSync(join(ROOT, 'dist', 'services', 'config.js'))).toBe(true);
      expect(existsSync(join(ROOT, 'dist', 'services', 'youtube.js'))).toBe(true);
    });

    it('dist contains expected command modules', () => {
      expect(existsSync(join(ROOT, 'dist', 'commands', 'generate.js'))).toBe(true);
      expect(existsSync(join(ROOT, 'dist', 'commands', 'setup.js'))).toBe(true);
      expect(existsSync(join(ROOT, 'dist', 'commands', 'config.js'))).toBe(true);
      expect(existsSync(join(ROOT, 'dist', 'commands', 'completions.js'))).toBe(true);
      expect(existsSync(join(ROOT, 'dist', 'commands', 'history.js'))).toBe(true);
    });
  });

  describe('CLI binary', () => {
    it('--version outputs valid semver', () => {
      const out = execSync('node dist/cli.js --version', { cwd: ROOT, encoding: 'utf-8' }).trim();
      expect(out).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('--help outputs usage info', () => {
      const out = execSync('node dist/cli.js --help', { cwd: ROOT, encoding: 'utf-8' });
      expect(out).toContain('mx-lite');
      expect(out).toContain('playlist');
    });

    it('unknown command exits with error', () => {
      try {
        execSync('node dist/cli.js nonexistent-command 2>&1', { cwd: ROOT, encoding: 'utf-8' });
        expect.fail('should have thrown');
      } catch (e: any) {
        expect(e.status).not.toBe(0);
      }
    });

    it('all subcommands are listed in help', () => {
      const out = execSync('node dist/cli.js --help', { cwd: ROOT, encoding: 'utf-8' });
      for (const cmd of ['setup', 'config', 'list', 'play', 'history', 'completions']) {
        expect(out).toContain(cmd);
      }
    });
  });

  describe('npm pack contents', () => {
    it('tarball does not contain test files', () => {
      const out = execSync('npm pack --dry-run 2>&1', { cwd: ROOT, encoding: 'utf-8' });
      const testFiles = out.split('\n').filter(l => l.includes('__tests__'));
      expect(testFiles.length).toBe(0);
    });

    it('tarball does not contain source maps', () => {
      const out = execSync('npm pack --dry-run 2>&1', { cwd: ROOT, encoding: 'utf-8' });
      const mapFiles = out.split('\n').filter(l => /\.js\.map|\.d\.ts\.map/.test(l));
      expect(mapFiles.length).toBe(0);
    });

    it('tarball has reasonable file count (under 50)', () => {
      const out = execSync('npm pack --dry-run 2>&1', { cwd: ROOT, encoding: 'utf-8' });
      const match = out.match(/total files:\s+(\d+)/);
      expect(match).toBeTruthy();
      expect(Number(match![1])).toBeLessThan(50);
    });

    it('tarball includes README', () => {
      const out = execSync('npm pack --dry-run 2>&1', { cwd: ROOT, encoding: 'utf-8' });
      expect(out).toContain('README.md');
    });

    it('tarball includes package.json', () => {
      const out = execSync('npm pack --dry-run 2>&1', { cwd: ROOT, encoding: 'utf-8' });
      expect(out).toContain('package.json');
    });
  });
});
