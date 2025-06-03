import styled from "styled-components";

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;

  h1 {
    font-size: 1.5rem;
  }

  div {
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    gap: 1vh;

    h1 {
      font-size: 1.5rem;
    }

    div {
      font-size: 1rem;
    }
  }
`;

const InfoSection = ({ title, children }) => {
  return (
    <ContentBlock>
      <h1>{title}</h1>
      <div>{children}</div>
    </ContentBlock>
  );
};

export default InfoSection;
