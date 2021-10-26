export interface User {
  id: string;
  name: string;
  token: string;
}

interface searchPanelProp {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: searchPanelProp["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: searchPanelProp) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
