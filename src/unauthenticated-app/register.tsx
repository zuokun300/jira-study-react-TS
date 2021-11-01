import { FormEvent } from "react";
import * as qs from "qs";
import { cleanObject } from "../util/util";
import { useAuth } from "../context/auth-context";
import { Button, Card, Form, Input } from "antd";
import { LongButton } from "./index";

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  const { user, register } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
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
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
