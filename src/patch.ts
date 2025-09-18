import { DiffResult, PatchOptions } from './types';

export function patch(left: string, delta: DiffResult, options: PatchOptions = {}): string {
  if (!delta || delta.length === 0) {
    return left;
  }

  let result = '';

  for (const change of delta) {
    if (!change.added && !change.removed) {
      // Unchanged content
      result += change.value;
    } else if (change.added && !options.reverse) {
      // Add content
      result += change.value;
    } else if (change.removed && options.reverse) {
      // Add content when reversing
      result += change.value;
    }
    // Skip removed content (unless reversing), skip added content when reversing
  }

  return result;
}

export function unpatch(right: string, delta: DiffResult): string {
  return patch(right, delta, { reverse: true });
}

export function reverse(delta: DiffResult): DiffResult {
  return delta.map(change => ({
    ...change,
    added: change.removed,
    removed: change.added,
  }));
}