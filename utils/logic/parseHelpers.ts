/**
 * Find the position of a character, at zero bracket depth.
 * @param str Haystack.
 * @param ch Needle.
 * @returns The index of the needle, if found at the top level. Or -1 if not exists.
 */
export const topLevelIndex = (str: string, ch: string): number => {
  let bracketDepth = 0;
  const chars = str.split('');
  let char;
  let chPosition = -1;
  for (let i = 0; i < chars.length; i++) {
    char = chars[i];
    if (char === '(') bracketDepth++;
    if (char === ')') bracketDepth--;
    if (bracketDepth === 0 && char === ch) chPosition = i;
  }
  return chPosition;
};

/**
 * Removes whitespace.
 * @param str String to remove whitespace from.
 * @returns String without whitespace.
 */
export const removeWhitespace = (str: string): string => str.replace(/ /g, '');

/**
 * Determines if a string is wrapped in parentheses.
 * @param str String to check.
 * @returns Whether or not the string is wrapped.
 */
export const isWrapped = (str: string): boolean => {
  // If the string has an leading bracket
  // and the string returns to bracket depth zero before the end of the string
  // then the string is not wrapped in a set of brackets
  let bracketDepth = 0;
  let isWrapped = false;
  const chars = str.split('');
  let char;
  for (let i = 0; i < chars.length; i++) {
    char = chars[i];
    if (char === '(') bracketDepth++;
    if (char === ')') bracketDepth--;
    // If bracketDepth is zero anywhere between the first char and the last char, it's not wrapped
    if (0 < i && i < str.length - 1 && bracketDepth === 0) {
      isWrapped = false;
      break;
    }
    // If bracketDepth is zero at the end, and the last char is ), then it is wrapped
    else if (i === str.length - 1 && char === ')' && bracketDepth === 0)
      isWrapped = true;
  }
  return isWrapped;
};

/**
 * Unwraps a string if it is surrounded by parentheses.
 * @param str The string to unwrap.
 * @returns The unwrapped string.
 */
export const unwrap = (str: string): string => {
  if (isWrapped(str)) {
    let unwrapped = str;
    unwrapped = unwrapped.substring(1);
    unwrapped = unwrapped.substring(0, unwrapped.length - 1);
    return unwrapped;
  }
  return str;
};

// TODO function to convert string to WFF string using binding rules
// This is not critical! Can be done later. For now, user just needs to enter a WFF string
