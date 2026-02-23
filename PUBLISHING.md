# Publishing mixaroo-lite

## Pre-publish Checklist

1. All tests pass: `npm test`
2. Build succeeds: `npm run build`
3. Verify CLI works: `node dist/cli.js --help`
4. Check package contents: `npm pack --dry-run`
   - Should be ~30 files, ~17 kB
   - No test files or source maps
5. Dry-run publish: `npm publish --dry-run`

## Publish

```bash
npm login          # if not already logged in
npm publish        # publishes to npm registry
```

## Package Details

- **Name:** mixaroo-lite
- **Binary:** `mx-lite`
- **Entry:** `dist/cli.js`
- **Files included:** `dist/**/*.js` and `dist/**/*.d.ts` (excluding tests)
- **Package size:** ~17 kB
