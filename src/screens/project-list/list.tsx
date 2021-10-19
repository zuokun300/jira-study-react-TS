import { User } from "./search-panel";

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
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find((user) => user.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
