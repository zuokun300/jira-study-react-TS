import { FormEvent } from "react";
import * as qs from "qs";
import { cleanObject } from "../util/util";
import { useAuth } from "../context/auth-context";
import { Button, Card, Form, Input } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const { user, login } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label={"用户名"}
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type={"text"} />
      </Form.Item>
      <Form.Item
        label={"密码"}
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
