import styled from "styled-components";

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
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
