import { useState } from "react";
import {
  FaCalendarCheck,
  FaInfoCircle,
  FaRegUser,
  FaTable,
  FaTrophy,
  FaUser,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { IoChatbubble, IoSettings, IoSettingsOutline } from "react-icons/io5";
import {
  MdMail,
  MdSpaceDashboard,
  MdSupportAgent,
  MdAccountCircle,
  MdTimer,
} from "react-icons/md";
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router";
import styled from "styled-components";
import UserDropDown from "./components/UserDropDown";
import {
  RiCalendarScheduleFill,
  RiFocus2Fill,
  RiLogoutBoxRFill,
} from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Rank from "./pages/Rank";
import { FaRankingStar } from "react-icons/fa6";
import getHeaderTitle from "./utils/getHeaderTitle";
import { SlCalender } from "react-icons/sl";

const Container = styled.div`
  position: relative;
  /* height maybe auto krna pde */
  height: 100vh;
  width: 100vw;
  /* background-color: lightpink; */
  display: flex;
  box-sizing: border-box;

  /* C-1 (comnt out this) */
  /* overflow-y: ${({ $showSideBar }) => ($showSideBar ? "auto" : "scroll")}; */
  overflow-y: hidden; /* Remove auto/scroll from Container */

  @media (min-width: 1024px) {
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }
    -ms-overflow-style: none; /* IE 10+ */
    scrollbar-width: none; /* Firefox */
  }
`;

const Overlay = styled.div`
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  position: fixed;
  height: 100vh;
  width: auto;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  /* background-color: rgb(95, 0, 217, 0.4); */
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Sidebar = styled.div`
  /* C-4 (will-chng) */
  will-change: transform;
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
  gap: 1.5vh;

  @media (min-width: 1024px) {
    padding-top: 17vh;
  }
`;

const Redirect = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 1.8vh;
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
  /* C-3 (will-chng) */
  will-change: transform;
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
  /* z-index: 999999999999999999999999999999999; */
  /* width: 100vw; */
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
  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Content = styled.div`
  height: auto;
  background: linear-gradient(135deg, #d9e4f5 0%, #f7d9e3 100%);
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

    /* C-2 (cmnt out overflow and scroll-b)*/
    /* overflow-y: scroll;
    scroll-behavior: smooth; */
    overflow-y: auto; /* Let Content handle scrolling */
    height: 85vh; // Ensure consistent height
    scroll-behavior: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledBetaTag = styled.div`
  width: 100%;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
  /* background-color: aquamarine; */
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  color: #5f00d9;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 1rem; /* Equivalent to text-xs in Tailwind */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const navLinks = [
  {
    to: "/",
    icon: <MdSpaceDashboard />,
    label: "Dashboard",
    children: [
      {
        to: "/",
        label: "Focusmode",
        // icon: <MdTimer />,
      },
      {
        to: "/planner-dashboard",
        label: "Planner",
        // icon: <FaCalendarCheck />,
      },
    ],
  },
  {
    to: "/sessiontable",
    icon: <FaTable />,
    label: "Session Table",
  },
  {
    to: "/focusmode",
    icon: <RiFocus2Fill />,
    label: "Focus Mode",
    className: "focus",
  },
  {
    to: "/planner",
    icon: <RiCalendarScheduleFill />,
    label: "Planner",
  },
  {
    to: "/milestones",
    icon: <FaTrophy />,
    label: "MileStones",
  },
  {
    to: "/leaderboard",
    icon: <FaRankingStar />,
    label: "Leaderboards",
  },
  // {
  //   to: "/about",
  //   icon: <FaInfoCircle />,
  //   label: "About Us",
  //   headerText: "About Us",
  // },
  // {
  //   to: "/support",
  //   icon: <MdSupportAgent />,
  //   label: "Support",
  //   // headerText: "Customer Care",
  //   className: "support",
  // },
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sessionData, setSessionData] = useState([]);
  const [headerText, setHeaderText] = useState(
    getHeaderTitle(location.pathname)
  );
  const [showSideBar, setShowSideBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [currDeleteSessionId, setCurrDeleteSessionId] = useState(null);
  const [currManageSessionId, setCurrManageSessionId] = useState(null);
  const [currDisId, setCurrDisId] = useState(null);

  useEffect(() => {
    // location.pathname
    setHeaderText(getHeaderTitle(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const fetchSessionsOfCurrUser = async () => {
      try {
        // 1. get token
        const token = localStorage.getItem("token");

        // 2. send post req
        const res = await fetch("http://localhost:8000/session/currAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });

        const data = await res.json();

        // 3. response handling
        if (data.success) {
          console.log("All sessions", data.sessions);
          setSessionData([...data.sessions]);
        } else {
          toast.error(
            data.error ||
              data.message ||
              "Something went wrong while fetching session details"
          );
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong");
      }
    };

    fetchSessionsOfCurrUser();
  }, []);

  // React Strict Mode ke wajah se development mode me useEffect do baar run hota hai intentionally.
  useEffect(() => {
    console.log("RENDERING APP.JS");

    const verifyToken = async function () {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first!");
        // ✅ added navigate here also if no token
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/home", {
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Incoming data :", data);

        if (data.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  const avatarMenuItems = [
    {
      label: "Account",
      icon: <FaRegUser />,
      action: () => console.log("Go to Profile"),
      to: "/profile",
    },
    {
      label: "Settings",
      icon: <IoSettingsOutline />,
      action: () => console.log("Open Settings"),
      to: "/settings",
    },
  ];

  // ✅ Add loading or fallback UI while isLoggedIn is null
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  // ✅ If still false, redirecting handled inside useEffect. This just prevents rendering
  if (!isLoggedIn) {
    return null;
  }

  return (
    <Container $showSideBar={showSideBar}>
      <Sidebar $showSideBar={showSideBar}>
        <SidebarMenu>
          {navLinks.map((link, index) => {
            return (
              <div key={index}>
                <Redirect
                  className={link?.className}
                  to={link.to}
                  onClick={() => {
                    // setHeaderText(link.headerText);
                    setShowSideBar(false);
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Redirect>

                {/* Agar children hain toh unhe render karo */}
                {link.children && (
                  <div
                    style={{
                      marginLeft: "25px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1vh",
                      marginTop: "0.3rem",
                    }}
                  >
                    {link.children.map((child, idx) => (
                      <Redirect
                        key={idx}
                        to={child.to}
                        onClick={() => setShowSideBar(false)}
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "800",
                          padding: "1.5vh",
                        }}
                      >
                        {child.icon ? child.icon : "➤"} {child.label}
                      </Redirect>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </SidebarMenu>

        {<StyledBetaTag>BETA 1.0</StyledBetaTag>}

        {/* <Credit>
          Credit : design by{" "}
          <NavLink
            to="https://www.youtube.com/@dosomecoding"
            className="credit_link"
          >
            @DoSomeCoding❤️
          </NavLink>
        </Credit> */}
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
            setHeaderText={setHeaderText}
          />
        </Navbar>

        <Content>
          <Outlet
            context={{
              currDeleteSessionId,
              setCurrDeleteSessionId,
              currManageSessionId,
              setCurrManageSessionId,
              currDisId,
              setCurrDisId,
              sessionData,
              setSessionData,
            }}
          />
        </Content>
      </ContentContainer>

      <Overlay
        $isVisible={
          currDeleteSessionId || currManageSessionId || currDisId !== null
        }
      />
    </Container>
  );
};

export default App;
