import { diff } from './diff';
import { patch, unpatch, reverse } from './patch';
import { MarkdownDiffPatch, DiffOptions, PatchOptions, DiffResult } from './types';

export class MarkdownDiffPatchInstance implements MarkdownDiffPatch {
  diff(left: string, right: string, options?: DiffOptions): DiffResult | undefined {
    return diff(left, right, options);
  }

  patch(left: string, delta: DiffResult, options?: PatchOptions): string {
    return patch(left, delta, options);
  }

  unpatch(right: string, delta: DiffResult): string {
    return unpatch(right, delta);
  }

  reverse(delta: DiffResult): DiffResult {
    return reverse(delta);
  }
}

const markdownDiffPatch = new MarkdownDiffPatchInstance();

export default markdownDiffPatch;
export { diff, patch, unpatch, reverse };
export * from './types';