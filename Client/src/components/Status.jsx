import styled from "styled-components";

const StatusSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $statusbgcolor }) => $statusbgcolor};
  padding: 0.2rem 0.2rem;
  font-size: 0.8rem;
  border-radius: 1rem;
  color: white;
`;

const Status = ({ statustext, statusbgcolor }) => {
  return <StatusSpan $statusbgcolor={statusbgcolor}>{statustext}</StatusSpan>;
};

export default Status;
