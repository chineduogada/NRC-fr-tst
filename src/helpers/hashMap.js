/**
 * Filters an array of objects based on a `filterValue` parameter
 * @param { Array<object> } array - An array of objects
 * @param { string } targetKeyObject - A key in the object whose value will be compared with
 * the `filterValue` parameter.
 * @param { string | number | boolean } filterValue - A matching value of `array.targetKeyObject`
 * to filter for.
 *
 * @returns { Array<object> } An array of object(s) if at least one match is found. Otherwise, an
 * empty array is returned
 */
export default (array, targetKeyObject, filterValue) => {
  // console.log(array);
  // console.log(filterValue, targetKeyObject);
  const result = array.filter((item) => item[targetKeyObject] === filterValue);
  console.log(result);
  return result;
};
