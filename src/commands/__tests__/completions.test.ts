import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { completionsCommand } from '../completions.js';

describe('completions command', () => {
  let output: string;
  const originalWrite = process.stdout.write;
  const originalExit = process.exit;

  beforeEach(() => {
    output = '';
    process.stdout.write = vi.fn((chunk: any) => {
      output += chunk;
      return true;
    }) as any;
    process.exit = vi.fn() as any;
  });

  afterEach(() => {
    process.stdout.write = originalWrite;
    process.exit = originalExit;
  });

  it('should output bash completion script', async () => {
    await completionsCommand('bash');
    expect(output).toContain('_mx_lite');
    expect(output).toContain('complete -F');
    expect(output).toContain('setup');
    expect(output).toContain('openai gemini anthropic');
  });

  it('should output zsh completion script', async () => {
    await completionsCommand('zsh');
    expect(output).toContain('#compdef mx-lite');
    expect(output).toContain('setup');
    expect(output).toContain('--save');
  });

  it('should output fish completion script', async () => {
    await completionsCommand('fish');
    expect(output).toContain('complete -c mx-lite');
    expect(output).toContain('setup');
    expect(output).toContain('openai gemini anthropic');
  });

  it('should be case-insensitive', async () => {
    await completionsCommand('BASH');
    expect(output).toContain('_mx_lite');
  });

  it('should exit with error for unknown shell', async () => {
    await completionsCommand('powershell');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should exit with error for empty shell', async () => {
    await completionsCommand('');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should include all commands in bash completions', async () => {
    await completionsCommand('bash');
    for (const cmd of ['setup', 'config', 'list', 'play', 'history', 'completions']) {
      expect(output).toContain(cmd);
    }
  });

  it('should include all flags in fish completions', async () => {
    await completionsCommand('fish');
    for (const flag of ['length', 'provider', 'save', 'verbose', 'help']) {
      expect(output).toContain(flag);
    }
  });
});
