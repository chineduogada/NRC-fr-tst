const arrayToString = arr => arr.join(',');

export default obj => {
  let queryString = '?';
  const keysInObj = Object.keys(obj);

  keysInObj.forEach((key, index) => {
    const keyValue = obj[key];
    queryString += `${key}=${arrayToString(keyValue)}`;

    if (index !== keysInObj.length - 1) {
      queryString += '&';
    }
  });

  return queryString;
};
