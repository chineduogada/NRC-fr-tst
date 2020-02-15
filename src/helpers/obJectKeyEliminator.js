export default (obj, keys) => {
  const objCopy = Object.assign({}, obj);

  for (const key of keys) {
    delete objCopy[key];
  }

  return objCopy;
};
