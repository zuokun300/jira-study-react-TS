import * as auth from "../auth-provider";
import qs from "qs";
import { useAuth } from "../context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;
interface CustomConfig extends RequestInit {
  data?: object;
  token?: string;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: CustomConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios和fetch的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  // js中的typeof是runtime运行时的

  // ts的typeof是在静态环境下的运行的
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// 类型
type FavouriteNumber = string;

// 联合类型
type OtherNumber = string | number;

// type与interface很相似，但是interface不能做到联合接口，而type可以做到联合类型，除去联合类型还有交叉类型

// interface也无法实现Utility type
type Person = {
  name: string;
  age: number;
};

// Partial用于设置类型中的属性可以为可选的，让他们可传可不传
const zk: Partial<Person> = { name: "zk" };
// omit用于删除某个type中的属性，删除的属性名放在后面，可以用|连接
const shenMiRen: Omit<Person, "name"> = { age: 8 };

// Partial 的实现
type Partial<T> = {
  // 接口与类型的属性定义中，?:象征着该属性是可选的
  [P in keyof T]?: T[P];
};
