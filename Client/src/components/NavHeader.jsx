import styled from "styled-components";
import { MdAccountCircle } from "react-icons/md";

const Nav = styled.nav`
  width: 100%;
  height: 10vh;
  /* background-color: lightseagreen; */
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.5rem;
  font-weight: 700;
`;

const NavHeader = () => {
  return (
    <Nav>
      <div>DashBoard</div>
      <MdAccountCircle />
    </Nav>
  );
};

export default NavHeader;
