import styled from "styled-components";
import { MdAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 800;

  @media (min-width: 480px) {
    padding: 0 2rem;
    font-size: 1.4rem;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    padding: 0 3rem;
    font-size: 2rem;
    font-weight: 700;
  }

  @media (min-width: 1024px) {
    padding: 0 3rem;
    font-size: 2.2rem;
    font-weight: 700;
  }

  @media (min-width: 1024px) {
    padding: 0 3rem;
    font-size: 2.4rem;
    font-weight: 700;
  }
`;

const Hamburger = styled(GiHamburgerMenu)`
  transform: ${({ $toggleSideBar }) =>
    $toggleSideBar ? "rotate(-90deg)" : "none"};

  transition: all 0.4s ease-in-out;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavHeader = ({ headerText, setToggleSideBar, toggleSideBar }) => {
  return (
    <Nav>
      <Hamburger
        $toggleSideBar={toggleSideBar}
        onClick={() => setToggleSideBar((prev) => !prev)}
      />
      <div>{headerText}</div>
      <MdAccountCircle />
    </Nav>
  );
};

export default NavHeader;
