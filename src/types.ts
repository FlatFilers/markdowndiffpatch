export interface DiffOptions {
  ignoreWhitespace?: boolean;
  context?: number;
}

export interface PatchOptions {
  reverse?: boolean;
}

export type DiffResult = Array<{
  count?: number;
  added?: boolean;
  removed?: boolean;
  value: string;
}>;

export interface MarkdownDiffPatch {
  diff(left: string, right: string, options?: DiffOptions): DiffResult | undefined;
  patch(left: string, delta: DiffResult, options?: PatchOptions): string;
  unpatch(right: string, delta: DiffResult): string;
  reverse(delta: DiffResult): DiffResult;
}