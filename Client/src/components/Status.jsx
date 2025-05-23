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

const Status = ({ statustext }) => {
  let statusbgcolor;

  if (statustext.toLowerCase() === "completed") {
    statusbgcolor = "rgba(6, 156, 111, 0.8)";
  } else if (statustext.toLowerCase() === "pending") {
    statusbgcolor = "rgba(154,156,159,0.8)";
  } else if (statustext.toLowerCase() === "cancelled") {
    statusbgcolor = "rgba(221, 26, 26, 0.8)";
  } else if (statustext.toLowerCase() === "processing") {
    statusbgcolor = "rgba(245,164,12,0.8)";
  } else {
    statusbgcolor = "white";
  }

  return <StatusSpan $statusbgcolor={statusbgcolor}>{statustext}</StatusSpan>;
};

export default Status;
