import styled from "styled-components";

const Currency = styled.span`
  border: unset;
  padding: 0.2rem 0.4rem;
  font-size: 0.5rem;
  font-weight: 800;
  border-radius: 10rem;
  color: #797e82;
  background-color: rgb(227, 227, 227);
`;

const CurrencyTag = function ({ children }) {
  return <Currency>{children}</Currency>;
};

export default CurrencyTag;
