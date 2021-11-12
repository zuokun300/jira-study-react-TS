import { FormEvent } from "react";
import * as qs from "qs";
import { cleanObject } from "../util/util";
import { useAuth } from "../context/auth-context";
import { Button, Card, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../util/use-async";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({ onError } : { onError : (error: Error) => void }) => {
  const { user, login } = useAuth();
  const { run, isLoading } = useAsync(undefined, {throwOnError: true})
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await run(login(values));
    } catch (e : any) {
      onError(e)
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type={"text"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
