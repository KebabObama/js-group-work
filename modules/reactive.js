/**
 * Creates a reactive store
 * @template T
 * @param {T} initialValue - The initial state value of the store.
 * @returns {{
 *   get: () => T,
 *   set: (newValue: T | ((prev: T) => T)) => void,
 *   subscribe: (fn: (value: T, prev?: T) => void) => () => void
 * }} A store object with getter, setter, and subscription methods.
 */
export const createStore = (initialValue) => {
  let value = initialValue;
  const subscribers = new Set();
  const get = () => value;
  const set = (newValue) => {
    const oldValue = value;
    value = typeof newValue === "function" ? newValue(value) : newValue;
    if (value !== oldValue) subscribers.forEach((fn) => fn(value, oldValue));
  };
  const subscribe = (fn) => {
    subscribers.add(fn);
    fn(value);
    return () => subscribers.delete(fn);
  };

  return { get, set, subscribe };
};
