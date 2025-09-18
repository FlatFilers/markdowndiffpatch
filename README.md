# markdowndiffpatch

A markdown-focused diff and patch library with jsondiffpatch-compatible interfaces.

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

## License

MIT