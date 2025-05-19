import { NavLink } from "react-router";
import styled from "styled-components";
import { GrTransaction } from "react-icons/gr";
import { MdSpaceDashboard, MdSupportAgent } from "react-icons/md";

const Sidebar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #4942e4;
  position: absolute;
  top: 10vh;
  width: 100%;
  height: 90vh;
  z-index: 999;
  padding-top: calc(10vh + 1rem);

  /* animation using opacity, transform */
  transition: all 0.4s ease-in-out;
  opacity: ${({ $toggleSideBar }) => {
    return $toggleSideBar ? "1" : "0";
  }};
  transform: ${({ $toggleSideBar }) => {
    return $toggleSideBar ? "translateX(0)" : "translateX(-100%)";
  }};

  @media (min-width: 1024px) {
    position: static;
    width: 20%;
    height: 100vh;
    opacity: 1;
    transform: translateX(0);
  }
`;

const Redirect = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 90%;
  padding: 8px;
  border-radius: 0.3rem;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 700;
  color: black;
  background-color: #8696fe;

  &:hover {
    background-color: lightgrey;
  }
`;

const SideNav = ({ setHeaderText, toggleSideBar, setToggleSideBar }) => {
  return (
    <Sidebar $toggleSideBar={toggleSideBar}>
      <Redirect
        to="/"
        onClick={() => {
          setHeaderText("DashBoard");
          setToggleSideBar(false);
        }}
      >
        <MdSpaceDashboard />
        <span>Home</span>
      </Redirect>
      <Redirect
        to="/transactions"
        onClick={() => {
          setHeaderText("Recent Transactions");
          setToggleSideBar(false);
        }}
      >
        <GrTransaction />
        <span>Transaction</span>
      </Redirect>
      <Redirect
        to="/support"
        onClick={() => {
          setHeaderText("Customer Care");
          setToggleSideBar(false);
        }}
      >
        <MdSupportAgent />
        <span>Support</span>
      </Redirect>
    </Sidebar>
  );
};

export default SideNav;
