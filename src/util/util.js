/**
 * 目的是清空对象中没有数据的元素
 * @param obj
 */
import { useEffect, useState } from "react";

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

// 简单版本防抖
// const useDebounce = function (callback, time) {
//   let timer
//   return function() {
//     if (timer) {
//       clearTimeout(time)
//     }
//     setTimeout(() => {
//       callback()
//     }, time)
//   }
// }
// 写一个custom Hook防抖
const useDebounce = function (value, delay) {
  const [debounceValue, setDebounceValue] = useState([value]);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

// 写一个custom Hook挂载时候的函数，类似于vue的mounted
const useMount = function (callback) {
  useEffect(() => {
    callback();
  }, []);
};

export { cleanObject, isFalsy, useMount, useDebounce };
