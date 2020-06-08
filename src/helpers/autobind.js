/**
 * @module
 */

/**
 * is a function
 */
const isFunction = (value) => {
  return typeof value === 'function';
};

const bind = (_constructor, methodName, method) => {
  _constructor[methodName] = method.bind(_constructor);
};

/**
 * Creates an auto binder
 *
 * @returns { Function } autobind
 */
const createAutoBind = (isFunction, bind) => {
  /**
   * Auto binds a set of functions to it's specified object
   * @param { ObjectConstructor } _constructor - The object's constructor - where `this` points.
   * @param { Array<string> } methodNames - An arbitrary list of method names passed as strings
   * @returns { void } `void`
   */
  const autobind = (_constructor, ...methodNames) => {
    methodNames.forEach((methodName) => {
      const method = _constructor[methodName];

      if (isFunction(method)) {
        bind(_constructor, methodName, method);
      }
    });
  };
  return autobind;
};

export default createAutoBind(isFunction, bind);
