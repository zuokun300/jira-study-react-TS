import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";

interface ListProps extends TableProps<Project>{
  users: User[];
}

export interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
}

export const List = ({ users, ...props }: ListProps) => {
  // @ts-ignore
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
          title: "部门",
          dataIndex: "organization"
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
        {
          title: "创建时间",
          render(value) {
            return (
              <span>
                {value.created ? dayjs(value.created).format('YYYY-MM-DD') : '无'}
              </span>
            );
          },
        }
      ]}
      {
        ...props
      }
    />
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
