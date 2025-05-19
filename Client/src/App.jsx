import { Outlet } from "react-router";
import styled from "styled-components";

import SideNav from "./components/SideNav";
import NavHeader from "./components/NavHeader";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  position: relative; //mobile
  height: 100vh;
  width: 100vw;
`;

const ContentContainer = styled.div`
  width: 100%; // mobile
  height: 100vh;

  @media (min-width: 1024px) {
    width: 85%; // for laptop, bg screens
  }
`;

const Content = styled.div`
  background-color: #f3f2f7;
  height: 90vh;
  padding: 2rem 3rem;
`;

const App = () => {
  const [headerText, setHeaderText] = useState("DashBoard");
  const [toggleSideBar, setToggleSideBar] = useState(false);

  return (
    <Container>
      <SideNav
        setHeaderText={setHeaderText}
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />

      <ContentContainer>
        <NavHeader
          headerText={headerText}
          setToggleSideBar={setToggleSideBar}
          toggleSideBar={toggleSideBar}
        />

        <Content>
          <Outlet />
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default App;
