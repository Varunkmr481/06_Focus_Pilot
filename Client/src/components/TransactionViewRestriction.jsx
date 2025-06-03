import styled from "styled-components";

const Error = styled.div`
  margin: 8vh auto;
  font-size: 0.7rem;
  font-weight: 600;
  color: red;
  text-transform: uppercase;

  @media (min-width: 425px) {
    font-size: 1rem;
  }
`;

const TransactionViewRestriction = () => {
  return (
    <Error>Please log in on laptop to see detailed recent transactions</Error>
  );
};

export default TransactionViewRestriction;
