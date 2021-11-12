import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import { cleanObject, useDebounce, useMount } from "../../util/util";
import * as qs from "qs";
import { useHttp } from "../../util/http";
import styled from "@emotion/styled";
import { useAsync } from "../../util/use-async";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 500);
  // const [list, setList] = useState([]);
  const client = useHttp();
  const { run, isLoading, error, data: list } = useAsync<Project[]>()

  useEffect(() => {
    run(client("projects", { data: cleanObject(debounceParam) }))
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List loading={isLoading} dataSource={list || []} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`
