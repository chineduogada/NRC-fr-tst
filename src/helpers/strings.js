export const truncate = (str, maxLength = 20) => {
  if (str) {
    str = `${str}`;
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  }
};

export const truncateCellValue = cell => {
  return truncate(cell.props.cell.value);
};
