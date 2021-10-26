import { FormEvent } from "react";
import * as qs from "qs";
import { cleanObject } from "../util/util";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const { user, login } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">用户名</label>
        <input type={"text"} id={"userName"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
