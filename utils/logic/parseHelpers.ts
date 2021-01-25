/**
 * Removes whitespace and surrounding brackets.
 * @param str String to sanitize.
 * @returns Sanitized string.
 */
export const sanitize = (str: string): string => {
  let sanitized = str.replace(/ /g, '');
  sanitized = unwrap(sanitized);
  return sanitized;
};

/**
 * Find the position of a character, at zero bracket depth.
 * @param str Haystack.
 * @param ch Needle.
 * @returns The index of the needle, if found at the top leve. Or -1 if not exists.
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
    if (0 < i && i < chars.length - 1 && bracketDepth === 0 && char === ch)
      chPosition = i;
  }
  return chPosition;
};

/**
 * Unwraps a string if it is surrounded by parentheses.
 * @param str The string to unwrap.
 * @returns The unwrapped string.
 */
export const unwrap = (str: string): string => {
  // If the string has an opening bracket
  // and the string returns to bracket depth zero before the end of the string
  // then the string is not wrapped in a set of brackets
  let unwrapped = str;
  let bracketDepth = 0;
  let isWrapped = false;
  const chars = unwrapped.split('');
  let char;
  for (let i = 0; i < chars.length; i++) {
    char = chars[i];
    if (char === '(') bracketDepth++;
    if (char === ')') bracketDepth--;
    // If bracketDepth is zero anywhere between the first char and the last char, it's not wrapped
    if (0 < i && i < unwrapped.length - 1 && bracketDepth === 0) {
      isWrapped = false;
      break;
    }
    // If bracketDepth is zero at the end, and the last char is ), then it is wrapped
    else if (i === unwrapped.length - 1 && char === ')' && bracketDepth === 0)
      isWrapped = true;
  }
  if (isWrapped) {
    unwrapped = unwrapped.substring(1);
    unwrapped = unwrapped.substring(0, unwrapped.length - 1);
  }
  return unwrapped;
};

// TODO function to convert string to WFF string using binding rules
// This is not critical! Can be done later. For now, user just needs to enter a WFF string
