export default (obj, keys) => {
    const objCopy = Object.assign({}, obj);

    for(const key of keys) {
        if (objCopy[key]) {
            delete objCopy[key];
        }
    }

    return objCopy;
}