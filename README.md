# markdowndiffpatch

[![npm version](https://badge.fury.io/js/markdowndiffpatch.svg)](https://badge.fury.io/js/markdowndiffpatch)
[![npm downloads](https://img.shields.io/npm/dm/markdowndiffpatch.svg)](https://www.npmjs.com/package/markdowndiffpatch)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A markdown-focused diff and patch library with [jsondiffpatch](https://github.com/benjamine/jsondiffpatch)-compatible interfaces.

## Installation

```bash
npm install markdowndiffpatch
```

## Usage

```typescript
import markdownDiffPatch from 'markdowndiffpatch';

const left = '# Hello\n\nThis is a test.';
const right = '# Hello\n\nThis is a test.\n\nNew paragraph.';

// Create a diff
const delta = markdownDiffPatch.diff(left, right);

// Apply the patch
const patched = markdownDiffPatch.patch(left, delta);

// Reverse the patch
const unpatched = markdownDiffPatch.unpatch(right, delta);

// Reverse the delta
const reversedDelta = markdownDiffPatch.reverse(delta);
```

## API

### `diff(left: string, right: string, options?: DiffOptions): DiffResult | undefined`

Creates a diff between two markdown strings. Returns `undefined` if the strings are identical.

### `patch(left: string, delta: DiffResult, options?: PatchOptions): string`

Applies a diff to a markdown string.

### `unpatch(right: string, delta: DiffResult): string`

Reverses a patch operation.

### `reverse(delta: DiffResult): DiffResult`

Reverses a delta so that it can be applied in the opposite direction.

## Related Projects

- [jsondiffpatch](https://github.com/benjamine/jsondiffpatch) - Diff & patch JavaScript objects
- [htmldiffpatch](https://github.com/FlatFilers/htmldiffpatch) - Diff & patch for HTML documents

## License

MIT