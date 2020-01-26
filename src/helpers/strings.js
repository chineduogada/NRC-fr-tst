export const truncate = (str, maxLength = 20) => {
  console.log(str);
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};

export const truncateCellValue = cell => {
  return truncate(cell.props.cell.value);
};
