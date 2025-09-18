import * as Diff from 'diff';
import { DiffOptions, DiffResult } from './types';

export function diff(left: string, right: string, options: DiffOptions = {}): DiffResult | undefined {
  if (left === right) {
    return undefined;
  }

  const diffOptions: any = {
    ignoreWhitespace: options.ignoreWhitespace || false,
  };

  const changes = Diff.diffLines(left, right, diffOptions);

  const result: DiffResult = changes.map(change => ({
    value: change.value,
    count: change.count,
    added: change.added,
    removed: change.removed,
  }));

  return result.length === 1 && !result[0].added && !result[0].removed ? undefined : result;
}