import {
  unwrap,
  removeWhitespace,
  topLevelIndex,
  isWrapped,
} from '../../../../utils/logic/parseHelpers';

describe('unwrap()', () => {
  test('unwraps a string with outer parentheses', () => {
    const before = '(A)';
    const after = 'A';
    expect(unwrap(before)).toMatch(after);
  });
  test('unwraps a string with outer brackets', () => {
    const before = '[A]';
    const after = 'A';
    expect(unwrap(before)).toMatch(after);
  });
  test("doesn't unwrap a string formatted (A) ∧ (B)", () => {
    const before = '(A) ∧ (B)';
    const after = '(A) ∧ (B)';
    expect(unwrap(before)).toMatch(after);
  });
  test('leaves a string without outer parentheses nor brackets untouched', () => {
    const before = 'A ∧ B';
    const after = 'A ∧ B';
    expect(unwrap(before)).toMatch(after);
  });
});

describe('isWrapped()', () => {
  test('returns true if a string is wrapped in parentheses', () => {
    const input = '((A) ∧ (B))';
    const output = true;
    expect(isWrapped(input)).toEqual(output);
  });
  test('returns false if a string is not wrapped in parentheses', () => {
    const input = '(A) ∧ (B)';
    const output = false;
    expect(isWrapped(input)).toEqual(output);
  });
});

describe('removeWhitespace()', () => {
  test('returns a string with no white space', () => {
    const before = '(A) ∧ (B)';
    const after = '(A)∧(B)';
    expect(removeWhitespace(before)).toMatch(after);
  });
});

describe('topLevelIndex()', () => {
  test('returns the position of a character existing at bracket depth 0', () => {
    const haystack = '(A) ∧ (B)';
    const needle = '∧';
    const position = 4;
    expect(topLevelIndex(haystack, needle)).toEqual(position);
  });
  test('returns -1 if the character does not exist at bracket depth 0', () => {
    const haystack = '(A ∧ C) → B)';
    const needle = '∧';
    const position = -1;
    expect(topLevelIndex(haystack, needle)).toEqual(position);
  });
});
