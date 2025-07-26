import styled from "styled-components";

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <div>Loading....</div>
    </LoaderContainer>
  );
};

export default Loader;
