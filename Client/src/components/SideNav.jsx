import { NavLink } from "react-router";
import styled from "styled-components";
import { GrTransaction } from "react-icons/gr";
import { MdSpaceDashboard, MdSupportAgent } from "react-icons/md";

const Sidebar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: calc(10vh + 1rem);
  width: 15%;
  height: 100vh;
  /* background-color: lightgreen; */
  display: flex;
  flex-direction: column;
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

  &:hover {
    background-color: lightgrey;
  }
`;

const SideNav = () => {
  return (
    <Sidebar>
      <Redirect to="/">
        <MdSpaceDashboard />
        <span>Home</span>
      </Redirect>
      <Redirect to="/about">
        <GrTransaction />
        <span>Transaction</span>
      </Redirect>
      <Redirect to="/support">
        <MdSupportAgent />
        <span>Support</span>
      </Redirect>
    </Sidebar>
  );
};

export default SideNav;
