import markdownDiffPatch, { diff, patch, unpatch, reverse } from '../index';

describe('markdowndiffpatch', () => {
  describe('diff', () => {
    it('should return undefined for identical content', () => {
      const content = '# Hello\n\nThis is a test.';
      expect(diff(content, content)).toBeUndefined();
      expect(markdownDiffPatch.diff(content, content)).toBeUndefined();
    });

    it('should detect additions', () => {
      const left = '# Hello\n\nThis is a test.';
      const right = '# Hello\n\nThis is a test.\n\nNew paragraph.';

      const result = diff(left, right);
      expect(result).toBeDefined();
      expect(result!.some(change => change.added)).toBe(true);
    });

    it('should detect removals', () => {
      const left = '# Hello\n\nThis is a test.\n\nOld paragraph.';
      const right = '# Hello\n\nThis is a test.';

      const result = diff(left, right);
      expect(result).toBeDefined();
      expect(result!.some(change => change.removed)).toBe(true);
    });

    it('should detect modifications', () => {
      const left = '# Hello\n\nThis is a test.';
      const right = '# Hello World\n\nThis is a test.';

      const result = diff(left, right);
      expect(result).toBeDefined();
      expect(result!.length).toBeGreaterThan(0);
    });
  });

  describe('patch', () => {
    it('should apply additions correctly', () => {
      const left = '# Hello\n\nThis is a test.';
      const right = '# Hello\n\nThis is a test.\n\nNew paragraph.';

      const delta = diff(left, right);
      expect(delta).toBeDefined();

      const patched = patch(left, delta!);
      expect(patched).toBe(right);
    });

    it('should apply removals correctly', () => {
      const left = '# Hello\n\nThis is a test.\n\nOld paragraph.';
      const right = '# Hello\n\nThis is a test.';

      const delta = diff(left, right);
      expect(delta).toBeDefined();

      const patched = patch(left, delta!);
      expect(patched).toBe(right);
    });

    it('should handle empty delta', () => {
      const content = '# Hello\n\nThis is a test.';
      const patched = patch(content, []);
      expect(patched).toBe(content);
    });
  });

  describe('unpatch', () => {
    it('should reverse patch operations', () => {
      const left = '# Hello\n\nThis is a test.';
      const right = '# Hello\n\nThis is a test.\n\nNew paragraph.';

      const delta = diff(left, right);
      expect(delta).toBeDefined();

      const unpatched = unpatch(right, delta!);
      expect(unpatched).toBe(left);
    });
  });

  describe('reverse', () => {
    it('should reverse delta operations', () => {
      const left = '# Hello\n\nThis is a test.';
      const right = '# Hello\n\nThis is a test.\n\nNew paragraph.';

      const delta = diff(left, right);
      expect(delta).toBeDefined();

      const reversed = reverse(delta!);

      // Test that reverse works by applying it as a patch
      const patchedWithReverse = patch(right, reversed);
      expect(patchedWithReverse).toBe(left);
    });
  });

  describe('integration', () => {
    it('should work with complex markdown', () => {
      const left = `# My Document

## Introduction
This is the introduction.

## Content
- Item 1
- Item 2

## Conclusion
That's all folks!`;

      const right = `# My Updated Document

## Introduction
This is the updated introduction.

## Content
- Item 1
- Item 2
- Item 3

## New Section
This is a new section.

## Conclusion
That's all folks!`;

      const delta = markdownDiffPatch.diff(left, right);
      expect(delta).toBeDefined();

      const patched = markdownDiffPatch.patch(left, delta!);
      expect(patched).toBe(right);

      const unpatched = markdownDiffPatch.unpatch(right, delta!);
      expect(unpatched).toBe(left);
    });
  });
});