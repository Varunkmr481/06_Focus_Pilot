import { useState } from "react";
import { FaCaretDown, FaDownload, FaInfoCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import {
  MdAccountCircle,
  MdSpaceDashboard,
  MdSupportAgent,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import styled from "styled-components";
import Status from "./components/Status";
import Transactions from "./components/Transactions";

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

const GridContentHome = styled.div`
  display: grid;
  /* for laptops */
  grid-template-rows: 10vh 25vh 25vh 10vh 10vh;
  gap: 3vh;
  background-color: blue;

  .item_1 {
    background-color: aqua;
  }

  .item_2 {
    background-color: blueviolet;
  }

  .item_3 {
    background-color: cadetblue;
  }

  .item_4 {
    background-color: coral;
  }

  .item_5 {
    background-color: violet;
  }

  @media (min-width: 320px) {
    grid-template-rows: 15vh 30vh 30vh 15vh 15vh;
  }

  @media (min-width: 425px) {
    grid-template-rows: 15vh 50vh 50vh 15vh 15vh;
  }

  @media (min-width: 768px) {
    grid-template-rows: 20vh 55vh 55vh 20vh 20vh;
  }

  @media (min-width: 1024px) {
    gap: 3vh;
    grid-template-columns: auto auto;
    grid-template-rows: 15vh 40vh 15vh;

    .item_1 {
      grid-column: 1/3;
    }

    .item_2 {
      grid-column: 1/2;
    }

    .item_3 {
      grid-column: 2/3;
    }

    .item_4 {
      grid-column: 1/2;
    }

    .item_5 {
      grid-column: 2/3;
    }
  }
`;

const GridContentTransaction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2vh;
`;

const ExportBtn = styled.button`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5vh;
  border: unset;
  outline: unset;
  border-radius: 0.3rem;
  background-color: #4942e4;
  color: white;
  padding: 1.5vh 3vh;
`;

const Table = styled.div`
  width: 100%;
  height: auto;
  background-color: cornflowerblue;
  border-radius: 0.9rem 0.9rem 0.9rem 0.9rem;
`;

const TableType = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.9rem 0.9rem 0 0;

  .input {
    background-color: red;
    margin-left: auto;
  }
`;

const TableTypeCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  padding: 2vh 3vw;
  font-weight: 800;
  border-radius: 0.9rem 0.9rem 0 0;

  &:hover {
    background-color: darkorchid;
    cursor: pointer;
  }
`;

const TableTypeSticker = styled.div`
  color: rgb(0, 0, 0);
  background-color: rgba(206, 204, 204, 0.8);
  border-radius: 0.7rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.6rem;
  font-weight: 700;
`;

const TableHeader = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 10vw 20vw 15vw 15vw 6vw;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
`;

const TableHeaderCell = styled.div`
  display: flex;
  gap: 1vh;
  padding: 2vh 0;
  font-weight: 800;
  border-radius: 0.9rem 0.9rem 0 0;
`;

const TableBody = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
`;

const TableRow = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 10vw 20vw 15vw 15vw 6vw;
`;

const TableRowCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  padding: 2vh 0;
  font-weight: 800;
  border-bottom: 0.5px solid rgb(92, 91, 91, 0.3);
`;

const LightShadeSpan = styled.span`
  color: rgba(91, 90, 90, 0.4);
  font-weight: 300;
  font-size: 0.9rem;
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
