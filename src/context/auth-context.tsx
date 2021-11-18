import React, { ReactNode, useState } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/search-panel";
import { useAsync } from "../util/use-async";
import { http } from "../util/http";
import { useMount } from "../util/util";
import { FullPageLoading, FullPageLoadingErrorCallback } from "../components/lib";

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

interface AuthForm {
  username: string;
  password: string;
}
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user
  }
  return user
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isIdle, isLoading, isError, error, data: user, setData: setUser} = useAsync<User | null>()

  // const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading/>
  }

  // 处理me接口报错
  if (isError) {
    return <FullPageLoadingErrorCallback error={error}/>
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
