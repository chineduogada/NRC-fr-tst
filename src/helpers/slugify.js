/**
 * Replaces every whitespaces with an different character
 * @param str a string to be slugified.
 * @param replacement a replacement character. Defaults to an underscore.
 */
export default (str, replacement = '_') => {
  if (typeof str === 'string') {
    return str
      .trim()
      .replace(' ', replacement)
      .toLowerCase();
  }

  return 'data';
};
