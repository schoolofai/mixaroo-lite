import { execFileSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';

export default function setup() {
  const cliPath = resolve(__dirname, 'dist/cli.js');
  if (!existsSync(cliPath)) {
    execFileSync('npm', ['run', 'build'], {
      cwd: __dirname,
      timeout: 30000,
      stdio: 'pipe',
    });
  }
}
