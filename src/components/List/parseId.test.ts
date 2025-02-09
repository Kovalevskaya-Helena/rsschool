import { expect, test, describe } from 'vitest';
import { parseId } from './parseId';

describe('parseId', () => {
  test('Correct parse id from an url', () => {
    const testId = '22';

    expect(parseId(`/a/b/${testId}/`)).toBe(testId);
  });
});
