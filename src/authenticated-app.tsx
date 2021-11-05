import { useAuth } from "./context/auth-context";
import { ProjectList } from "./screens/project-list";
import {ReactComponent as SoftwareLogo} from "./assets/software-logo.svg";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { Dropdown, Menu } from "antd";

/**
 * 分别从内容和布局出发
 * 1：从内容出发，内容比较不确定，可能会有数量变多变少的情况，应该考虑使用flex box
 * 2：从布局出发，布局上网格的数量相对比较固定，给定网格布局后再填充细节内容，考虑使用grid来布局
 * 当然flex是一维布局（线性的形式，横着排列还是竖着排列），grid是二维布局（行与列的形式），这就是基本概念了
 * @constructor
 */

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={<Menu>
            <Menu.Item key={'logout'}>
              <a onClick={logout}>登出</a>
            </Menu.Item>
          </Menu>}>
            <a>
              Hi,{user?.name}
            </a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectList />
      </Main>
    </Container>
  );
};


  const Container = styled.div`
    //display: grid;
    //grid-template-rows: 6rem 1fr; 
    height: 100vh;
  `
  const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
  `
  const HeaderLeft = styled(Row)``
  const HeaderRight = styled.div`
  `
  const Main = styled.main`
    grid-area: main;
  `

