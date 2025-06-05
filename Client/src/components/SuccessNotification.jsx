import { NavLink } from "react-router";
import styled from "styled-components";

const SuccessOverlay = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessCard = styled.div`
  border: 2px solid #5f00d9;
  border-radius: 1rem;
  box-shadow: #5f00d9 1px 3px 20px 0.5px;
  /* background-color: red; */
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.4rem 0.8rem;
  margin: 0 0.6rem;

  img {
    width: 2rem;
  }

  @media (min-width: 480px) {
    gap: 1.2rem;
    padding: 1.8rem 1rem;
    width: 25rem;
  }
`;

const SuccessIcon = styled.div`
  width: 2rem;

  img {
    width: 2rem;
  }
`;

const SuccessTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;

const SuccessTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
`;

const SuccessSubtitle = styled.div`
  color: white;
  font-size: 0.9rem;
  color: rgb(114, 114, 114);
  text-align: center;
`;

const SuccessActionButton = styled(NavLink)`
  border: unset;
  text-align: center;
  text-decoration: none;
  width: 100%;
  border-radius: 0.4rem;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #5f00d9;
`;

const SuccessNotification = ({
  icon,
  title,
  subtitle,
  to,
  btntext,
  btn = true,
}) => {
  return (
    <SuccessOverlay>
      <SuccessCard>
        <SuccessIcon>{icon}</SuccessIcon>

        <SuccessTextGroup>
          <SuccessTitle>{title}</SuccessTitle>
          <SuccessSubtitle>{subtitle}</SuccessSubtitle>
        </SuccessTextGroup>

        {btn && <SuccessActionButton to={to}>{btntext}</SuccessActionButton>}
      </SuccessCard>
    </SuccessOverlay>
  );
};

export default SuccessNotification;
