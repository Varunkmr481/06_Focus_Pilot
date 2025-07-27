import styled from "styled-components";

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("/bg_2.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Bg = () => {
  return <Background>Hello</Background>;
};

export default Bg;
