import { Outlet } from "react-router";
import styled from "styled-components";

import SideNav from "./components/SideNav";
import NavHeader from "./components/NavHeader";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const ContentContainer = styled.div`
  width: 85%;
  height: 100vh;
  /* background-color: lightpink; */
`;

const Content = styled.div`
  background-color: #f3f2f7;
  height: 90vh;
  padding: 2rem 3rem;
`;

const App = () => {
  return (
    <Container>
      <SideNav />

      <ContentContainer>
        <NavHeader />

        <Content>
          <Outlet />
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default App;
