import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { completionsCommand } from '../completions.js';

describe('completions edge cases', () => {
  let output: string;
  let errorOutput: string;
  const originalWrite = process.stdout.write;
  const originalError = console.error;
  const originalLog = console.log;
  const originalExit = process.exit;

  beforeEach(() => {
    output = '';
    errorOutput = '';
    process.stdout.write = vi.fn((chunk: any) => {
      output += chunk;
      return true;
    }) as any;
    console.error = vi.fn((...args: any[]) => {
      errorOutput += args.join(' ');
    });
    console.log = vi.fn();
    process.exit = vi.fn() as any;
  });

  afterEach(() => {
    process.stdout.write = originalWrite;
    console.error = originalError;
    console.log = originalLog;
    process.exit = originalExit;
  });

  describe('shell name normalization', () => {
    it('should handle mixed case "Bash"', async () => {
      await completionsCommand('Bash');
      expect(output).toContain('_mx_lite');
    });

    it('should handle "ZSH" uppercase', async () => {
      await completionsCommand('ZSH');
      expect(output).toContain('#compdef');
    });

    it('should handle "Fish" mixed case', async () => {
      await completionsCommand('Fish');
      expect(output).toContain('complete -c mx-lite');
    });
  });

  describe('invalid inputs', () => {
    it('should reject shell with whitespace', async () => {
      await completionsCommand(' bash ');
      // trimmed " bash " won't match "bash" since toLowerCase doesn't trim
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it('should reject numeric input', async () => {
      await completionsCommand('123');
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it('should reject null-like string', async () => {
      await completionsCommand('null');
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('completion script content validation', () => {
    it('bash script should include config subcommands', async () => {
      await completionsCommand('bash');
      expect(output).toContain('show');
      expect(output).toContain('reset');
      expect(output).toContain('path');
      expect(output).toContain('set');
    });

    it('zsh script should include descriptions for commands', async () => {
      await completionsCommand('zsh');
      expect(output).toContain('Configure your AI provider');
      expect(output).toContain('Show saved playlists');
      expect(output).toContain('Show playlist generation history');
    });

    it('fish script should disable file completions', async () => {
      await completionsCommand('fish');
      expect(output).toContain('complete -c mx-lite -f');
    });

    it('fish script should include history --limit flag', async () => {
      await completionsCommand('fish');
      expect(output).toContain('history');
      expect(output).toContain('limit');
    });

    it('all scripts should end with newline', async () => {
      for (const shell of ['bash', 'zsh', 'fish']) {
        output = '';
        await completionsCommand(shell);
        expect(output.endsWith('\n'), `${shell} should end with newline`).toBe(true);
      }
    });
  });
});
