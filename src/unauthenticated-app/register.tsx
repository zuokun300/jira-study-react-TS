import { FormEvent } from "react";
import * as qs from "qs";
import { cleanObject } from "../util/util";
import { useAuth } from "../context/auth-context";
import { Button, Card, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../util/use-async";

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = ({ onError } : { onError : (error: Error) => void } ) => {
  const { user, register } = useAuth();
  const { run, isLoading, error} = useAsync(undefined, {throwOnError: true})
  const handleSubmit = async ({cpassword, ...values}: { username: string; password: string, cpassword: string }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次密码输入相同'))
      return
    }
    try {
      await run(register(values))
    } catch (e : any) {
      onError(e)
    }
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
      <Form.Item
        label={"确认密码"}
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input type={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
