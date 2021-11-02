import { useAuth } from "./context/auth-context";
import { ProjectList } from "./screens/project-list";
import styled from "@emotion/styled";

/**
 * 分别从内容和布局出发
 * 1：从内容出发，内容比较不确定，可能会有数量变多变少的情况，应该考虑使用flex box
 * 2：从布局出发，布局上网格的数量相对比较固定，给定网格布局后再填充细节内容，考虑使用grid来布局
 * 当然flex是一维布局（线性的形式，横着排列还是竖着排列），grid是二维布局（行与列的形式），这就是基本概念了
 * @constructor
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Nav>
        Nav
      </Nav>
      <Main>
        <ProjectList />
      </Main>
      <Aside>
        Aside
      </Aside>
      <Footer>
        Footer
      </Footer>
    </Container>
  );
};


const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem; 
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: 
  "header header header"
  "nav main aside"
  "footer footer footer";
  height: 100vh;
`
  const Header = styled.header`
    grid-area: header;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `
  const HeaderLeft = styled.div`
    
  `
  const HeaderRight = styled.div`
  `
  const Main = styled.main`
    grid-area: main;
  `
  const Nav = styled.nav`
    grid-area: nav;
  `
  const Aside = styled.aside`
    grid-area: aside;
  `
  const Footer = styled.footer`
    grid-area: footer;
  `

