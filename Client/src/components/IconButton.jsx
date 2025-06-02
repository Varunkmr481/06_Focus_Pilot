import styled from "styled-components";

const Button = styled.button`
  width: 8rem;
  outline: unset;
  border: unset;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  background-color: #5f00d8;
  color: white;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 425px) {
    font-size: 1rem;
    width: 9rem;
  }

  @media (min-width: 1024px) {
    font-size: 0.8rem;
    width: 6rem;
  }

  @media (min-width: 1440px) {
    font-size: 1rem;
    width: 9rem;
  }
`;

const IconButton = function ({ icon, children }) {
  return (
    <Button>
      <span className="icon">{icon}</span>
      <span>{children}</span>
    </Button>
  );
};

export default IconButton;
