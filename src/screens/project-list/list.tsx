import { User } from "./search-panel";
import { Table } from "antd";

interface listProps {
  users: User[];
  list: Project[];
}

interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
}

export const List = ({ users, list }: listProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
    // <table>
    //   <thead>
    //     <tr>
    //       <th>名称</th>
    //       <th>负责人</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {list.map((project) => (
    //       <tr key={project.id}>
    //         <td>{project.name}</td>
    //         <td>{users.find((user) => user.id === project.personId)?.name}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};
