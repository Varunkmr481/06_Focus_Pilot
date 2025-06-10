import { useState } from "react";
import { FaInfoCircle, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { IoChatbubble, IoSettings } from "react-icons/io5";
import {
  MdMail,
  MdSpaceDashboard,
  MdSupportAgent,
  MdAccountCircle,
} from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router";
import styled from "styled-components";
import UserDropDown from "./components/UserDropDown";
import { RiLogoutBoxRFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Credit = styled.div`
  font-size: 0.8rem;
  font-weight: 700;

  .credit_link {
    text-decoration: none;
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
  const navigate = useNavigate();

  const avatarMenuItems = [
    {
      label: "Profile",
      icon: <FaUser />,
      action: () => console.log("Go to Profile"),
      to: "/profile",
    },
    {
      label: "Settings",
      icon: <IoSettings />,
      action: () => console.log("Open Settings"),
      to: "/settings",
    },
    {
      label: "Logout",
      icon: <RiLogoutBoxRFill />,
      action: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Successfully logged out!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      },
      // to: "/transactions",
    },
  ];

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

        <Credit>
          Credit : design by
          <NavLink
            to="https://www.youtube.com/@dosomecoding"
            className="credit_link"
          >
            @DoSomeCoding❤️
          </NavLink>
        </Credit>
      </Sidebar>

      <ContentContainer $showSideBar={showSideBar}>
        <Navbar>
          <Hamburger
            $showSideBar={showSideBar}
            onClick={() => setShowSideBar((prev) => !prev)}
          />
          <div>{headerText}</div>

          <UserDropDown
            avatarMenuItems={avatarMenuItems}
            userAvatar={<MdAccountCircle />}
          />
        </Navbar>

        <Content>
          <Outlet />
        </Content>
      </ContentContainer>

      <Toaster />
    </Container>
  );
};

export default App;
