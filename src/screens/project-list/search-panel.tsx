import { Form, Input, Select } from "antd";

export interface User {
  id: string;
  name: string;
  token: string;
}

interface searchPanelProp {
  users: User[];
  param: {
    name: string;
    personId : string;
  };
  setParam: (param: searchPanelProp["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: searchPanelProp) => {
  return (
    <Form style={{marginBottom: '2rem'}} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value, option) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
