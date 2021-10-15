/**
 * 目的是清空对象中没有数据的元素
 * @param obj
 */
function cleanObject(obj) {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
}

const isFalsy = (value) => (value === 0 ? false : !value);

export { cleanObject, isFalsy };
