import { Outlet } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import styled from "styled-components";
import Navigation from "./components/Navigation";
import Banner from "./components/Banner";

const Wrapper = styled.div`
  width: 100%;
  max-width: 850px;
  height: 100%;
  background-color: white;
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
  height: 50px;
  top: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  //background-color: red;
  width: 100%;
  padding: 20px 15px;
  border: 1px solid black;
  border-radius: 10px;
`;

const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Banner />
        <Header>
          <Navigation />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
    </>
  );
};

export default Layout;
