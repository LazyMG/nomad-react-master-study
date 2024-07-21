import { Outlet } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import styled from "styled-components";
import Navigation from "./components/Navigation";
import Banner from "./components/Banner";

const Wrapper = styled.div`
  width: 100%;
  max-width: 850px;
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  gap: 10px;
  margin-bottom: 30px;
`;

const Header = styled.nav`
  width: 100%;
  max-width: 850px;
  height: 60px;
  top: 0;
  display: flex;
  align-items: center;
  position: fixed;
  background-color: ${(props) => props.theme.bgColor};
  z-index: 1;
`;

const Content = styled.div`
  width: 100%;
  padding: 20px 15px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
`;

const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header>
          <Navigation />
        </Header>
        <Banner />
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
    </>
  );
};

export default Layout;
