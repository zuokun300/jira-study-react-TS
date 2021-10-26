/**
 * 目的是清空对象中没有数据的元素
 * @param obj
 */
import { useEffect, useState } from "react";

export function cleanObject(obj: object) {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
}

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

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
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState([value]);

  useEffect(() => {
    // @ts-ignore
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

// 写一个custom Hook挂载时候的函数，类似于vue的mounted
export const useMount = function (callback: () => void) {
  useEffect(() => {
    callback();
  }, []);
};

// 作业useArray——自己写的
// export const useArray = <V>(arr: V[]) => {
//   const [value, setValue] = useState(arr)
//   const clear = () => {
//     setValue([])
//   }
//   const removeIndex = (index: number) => {
//     const arrCopy = value
//     if (isFalsy(index) && index < arrCopy.length) {
//       delete arrCopy[index]
//       setValue(arrCopy)
//     }
//   }
//   const add = (obj: V) => {
//     const arrCopy = value
//     arrCopy.push(obj)
//     setValue(arrCopy)
//     console.log(value);
//   }
//   return {value, clear, removeIndex, add }
// }

// 作业useArray——答案
export const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    add: (item: T) => {
      setValue([...value, item]);
    },
    clear: () => {
      setValue([]);
    },
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
