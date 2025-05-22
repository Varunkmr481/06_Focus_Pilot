import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  /* height maybe auto krna pde */
  height: 100vh;
  width: 100vw;
  background-color: lightpink;
  display: flex;
  box-sizing: border-box;
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
  overflow: hidden;
  box-sizing: border-box;
  padding: 2vh;
  z-index: 100;

  @media (min-width: 1024px) {
    position: static;
    width: 20vw;
    height: 100vh;
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
    padding: auto 5vh;
    height: 85vh;
  }
`;

const GridContent = styled.div`
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

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <Container>
      <Sidebar $showSideBar={showSideBar}>
        <div>SIDEBAR</div>
        <button onClick={() => setShowSideBar((prev) => !prev)}>Sidebar</button>
      </Sidebar>

      <ContentContainer>
        <Navbar>
          <Hamburger
            $showSideBar={showSideBar}
            onClick={() => setShowSideBar((prev) => !prev)}
          />
          <div>Dashboard</div>
          <MdAccountCircle />
        </Navbar>

        <Content>
          <GridContent>
            <div className="item_1">INFO</div>
            <div className="item_2">GRAPH</div>
            <div className="item_3">TRANSACTION</div>
            <div className="item_4">FOOTER 1</div>
            <div className="item_5">FOOTER 2</div>
          </GridContent>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default App;
