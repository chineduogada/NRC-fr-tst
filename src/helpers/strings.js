export const truncate = (str, maxLength = 20) => {
  if (str) {
    str = `${str}`;
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  }
};

export const truncateCellValue = cell => {
  return truncate(cell.props.cell.value);
};

/**
 * Transforms text to one of `lowercase`, 'uppercase` or
 * `capitalize`
 * @param { string } str the text to transform
 * @param { string } transformation specifies how to transform
 * the text. Possible values are `c` for capitalize, `u` for
 * uppercase and `l` for lowercase
 *
 * @returns { string } a transformed text
 */
export const transformText = (str, transformation) => {
  const element = document.createElement('span');
  element.textContent = str;

  switch (transformation) {
    case 'u':
      element.style.textTransform = 'uppercase';
      break;
    case 'c':
      element.style.textTransform = 'capitalize';
      break;
    case 'l':
      element.style.textTransform = 'lowercase';
      break;
    default:
      element.style.textTransform = 'inherit';
  }

  console.log(element);

  return element.innerText;
};
