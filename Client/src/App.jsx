import { useState } from "react";
import { FaCaretDown, FaDownload, FaInfoCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { IoChatbubble } from "react-icons/io5";
import {
  MdAccountCircle,
  MdChat,
  MdContactMail,
  MdMail,
  MdMessage,
  MdSpaceDashboard,
  MdSupportAgent,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import styled from "styled-components";
import Status from "./components/Status";
import Transactions from "./components/Transactions";
import Support from "./components/Support";

const Container = styled.div`
  position: relative;
  /* height maybe auto krna pde */
  height: 100vh;
  width: 100vw;
  background-color: lightpink;
  display: flex;
  box-sizing: border-box;
  overflow-y: ${({ $showSideBar }) => ($showSideBar ? "auto" : "scroll")};

  @media (min-width: 1024px) {
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }
    -ms-overflow-style: none; /* IE 10+ */
    scrollbar-width: none; /* Firefox */
  }
`;

const Sidebar = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.4s ease-in-out;
  background-color: lightgreen;
  transform: ${({ $showSideBar }) =>
    $showSideBar ? "translate(0)" : "translate(-100%)"};
  overflow-y: hidden;
  box-sizing: border-box;
  padding: 2vh;
  z-index: 100;

  @media (min-width: 1024px) {
    position: static;
    width: 20vw;
    height: auto;
    transform: none;
  }
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh;

  @media (min-width: 1024px) {
    padding-top: 17vh;
  }
`;

const Redirect = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 2vh;
  border-radius: 0.3rem;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 700;
  color: black;
  background-color: #8696fe;
  box-sizing: border-box;

  &:hover {
    background-color: lightgrey;
  }
`;

const ContentContainer = styled.div`
  /* height maybe auto krna pde */
  height: 100vh;
  width: 100vw;
  transition: all 0.4s ease-in-out;
  transform: ${({ $showSideBar }) =>
    $showSideBar ? "translate(100%)" : "translate(0)"};
  box-sizing: border-box;
  background-color: lightseagreen;

  @media (min-width: 1024px) {
    width: 80vw;
    height: 100vh;
  }
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  width: 100vw;
  background-color: cornflowerblue;
  padding: 0 2vh;
  font-size: 1rem;
  font-weight: 800;

  @media (min-width: 480px) {
    padding: 0 4vh;
    font-size: 1.4rem;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    padding: 0 5vh;
    font-size: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.4rem;
    width: 80vw;
  }
`;

const Hamburger = styled(GiHamburgerMenu)`
  @media (min-width: 1024px) {
    display: none;
  }
`;

const Content = styled.div`
  height: auto;
  background-color: yellowgreen;
  padding: 3vh 2vh;

  @media (min-width: 480px) {
    padding: 4vh 4vh;
  }

  @media (min-width: 768px) {
    padding: 5vh 5vh;
  }

  @media (min-width: 1024px) {
    padding: 4vh 5vh;
    height: 85vh;
    overflow-y: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const App = () => {
  const [headerText, setHeaderText] = useState("DashBoard");
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <Container $showSideBar={showSideBar}>
      <Sidebar $showSideBar={showSideBar}>
        <SidebarMenu>
          <Redirect
            to="/"
            onClick={() => {
              setHeaderText("DashBoard");
              setShowSideBar(false);
            }}
          >
            <MdSpaceDashboard />
            <span>Home</span>
          </Redirect>

          <Redirect
            to="/transactions"
            onClick={() => {
              setHeaderText("Recent Transactions");
              setShowSideBar(false);
            }}
          >
            <GrTransaction />
            <span>Transaction</span>
          </Redirect>

          <Redirect
            to="/about"
            onClick={() => {
              setHeaderText("About Us");
              setShowSideBar(false);
            }}
          >
            <FaInfoCircle />
            <span>About Us</span>
          </Redirect>

          <Redirect
            className="support"
            to="/support"
            onClick={() => {
              setHeaderText("Customer Care");
              setShowSideBar(false);
            }}
          >
            <MdSupportAgent />
            <span>Support</span>
          </Redirect>

          <button onClick={() => setShowSideBar((prev) => !prev)}>
            Sidebar
          </button>
        </SidebarMenu>
      </Sidebar>

      <ContentContainer>
        <Navbar>
          <Hamburger
            $showSideBar={showSideBar}
            onClick={() => setShowSideBar((prev) => !prev)}
          />
          <div>{headerText}</div>
          <MdAccountCircle />
        </Navbar>

        <Content>
          <Outlet />
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default App;
