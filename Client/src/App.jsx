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
  /* background-color: lightpink; */
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
  /* background-color: lightgreen; */
  background-color: white;
  transform: ${({ $showSideBar }) =>
    $showSideBar ? "translate(0)" : "translate(-100%)"};
  overflow-y: hidden;
  box-sizing: border-box;
  padding: 2vh;
  z-index: 100;
  /* overflow-y: hidden; */

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
  /* background-color: #8696fe; */
  box-sizing: border-box;

  &.active {
    background-color: #5f00d9;
    color: white;
  }

  &:hover {
    background-color: lightgrey;
    color: black;
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
  /* background-color: lightseagreen; */
  overflow-y: ${({ $showSideBar }) => ($showSideBar ? "hidden" : "auto")};

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
  /* background-color: cornflowerblue; */
  background-color: #5f00d9;
  color: white;
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
  /* background-color: yellowgreen; */
  background-color: rgb(236, 236, 236);
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

const ContentSupportContainer = styled.div`
  background-color: plum;
  width: 100%;
`;

const GridSupportContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 25vh 70vh 25vh 25vh;
  row-gap: 5vh;

  .item-1,
  .item-3 {
    background-color: aqua;
  }

  .item-2,
  .item-4 {
    background-color: lightskyblue;
  }

  .item-1 {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    align-items: center;
    box-sizing: border-box;
  }

  .item-2 {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 22px;
    border: 2px solid red;
    border-radius: 1rem;
    padding: 1.5vh 2vh;
    box-sizing: border-box;
  }

  .item-3 {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    align-items: center;
    text-align: center;
  }

  .item-4 {
    background: linear-gradient(
      to right,
      #a049f7 0%,
      #8149f7 30%,
      #8b49f7 100%
    );
    border-radius: 1rem;
    padding: 0 2vh;
    z-index: 9;
    position: relative;
    box-sizing: border-box;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
      mix-blend-mode: multiply;
    }
  }

  @media (min-width: 768px) {
    grid-template-rows: 50vh 20vh;
    grid-template-columns: 40% 60%;
    row-gap: 5vh;

    .item-1,
    .item-3 {
      grid-column: 1/2;
    }

    .item-2,
    .item-4 {
      grid-column: 2/3;
    }

    .item-1 {
      align-items: stretch;
      padding: 0 0.8rem 0 0;
    }

    .item-2 {
      gap: 9px;
    }

    .item-3 {
      align-items: stretch;
      text-align: unset;
      padding: 0 0.8rem 0 0;
    }
  }
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;

  @media (min-width: 768px) {
    /* gap: 24px; */
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const MailIcon = styled(MdMail)`
  font-size: 2rem;
  color: #5f00d9;
`;

const HeaderText = styled.div`
  font-size: 1.9rem;
  font-weight: 900;
`;

const SubHeaderText = styled.div`
  font-size: 1rem;
  color: #5a5959;
`;

const ContactFormMessage = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const FormField = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  width: 50%;

  label {
    font-size: 1rem;
    font-weight: 500;
  }

  input {
    height: 2rem;
  }

  input,
  textarea {
    box-sizing: border-box;
    border-radius: 0.5rem;
    padding: 0.3rem 0.7rem;
    background-color: transparent;
    border: 2px solid rgba(152, 152, 152, 0.3);
    width: 100%;
  }
`;

const AgreementWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  label {
    font-size: 0.9rem;
    font-weight: 700;
  }

  input[type="checkbox"] {
    transform: scale(1.3);
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    gap: 0.8rem;
  }
`;

const FormBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.6rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 0;
  }
`;

const FormBtn = styled.div`
  width: 100%;
  background-color: #5f00d9;
  border-radius: 0.6rem;
  padding: 0.4rem 0.8rem;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: rgb(132, 45, 247);
    transform: translate(2px, -2px);
  }

  @media (min-width: 768px) {
    width: 48%;
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }
`;

const MessageIcon = styled(IoChatbubble)`
  font-size: 2rem;
  color: #5f00d9;
`;

const ChatbotWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  .chatbot-sticker {
    background-color: white;
    width: 5rem;
    text-align: center;
    padding: 0.1rem;
    border-radius: 0.8rem;
    color: #5f00d9;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .chatbot-header {
    font-size: 1.5rem;
    color: white;
    font-weight: 500;
  }
`;

const navLinks = [
  {
    to: "/",
    icon: <MdSpaceDashboard />,
    label: "Home",
    headerText: "DashBoard",
  },
  {
    to: "/transactions",
    icon: <GrTransaction />,
    label: "Transaction",
    headerText: "Recent Transactions",
  },
  {
    to: "/about",
    icon: <FaInfoCircle />,
    label: "About Us",
    headerText: "About Us",
  },
  {
    to: "/support",
    icon: <MdSupportAgent />,
    label: "Support",
    headerText: "Customer Care",
    className: "support",
  },
];

const App = () => {
  const [headerText, setHeaderText] = useState("DashBoard");
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <Container $showSideBar={showSideBar}>
      <Sidebar $showSideBar={showSideBar}>
        <SidebarMenu>
          {navLinks.map((link, index) => {
            return (
              <Redirect
                key={index}
                className={link?.className}
                to={link.to}
                onClick={() => {
                  setHeaderText(link.headerText);
                  setShowSideBar(false);
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </Redirect>
            );
          })}
        </SidebarMenu>
      </Sidebar>

      <ContentContainer $showSideBar={showSideBar}>
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
