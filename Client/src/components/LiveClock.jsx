import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Clock } from "lucide-react";

const breakpoints = {
  smMobile: "320px",
  mdMobile: "375px",
  lgMobile: "425px",
  tablet: "768px",
  smLaptop: "1024px",
  mdLaptop: "1280px",
  lgLaptop: "1440px",
};

const ClockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 0.6rem 0.8rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: background 0.3s ease;
  width: fit-content;

  &:hover {
    background: #f3f4f6;
  }

  @media (min-width: ${breakpoints.mdMobile}) {
    padding: 0.7rem 1rem;
    /* width: 9.5rem; */
  }

  @media (min-width: ${breakpoints.lgMobile}) {
    padding: 0.8rem 1rem;
    /* width: 15rem; */
    gap: 0.9rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: 0.9rem 1rem;
    /* width: 11rem; */
    gap: 1rem;
  }

  @media (min-width: ${breakpoints.smLaptop}) {
    padding: 1rem 1.5rem;
    /* width: 12.5rem; */
    gap: 1.25rem;
  }

  @media (min-width: ${breakpoints.mdLaptop}) {
    padding: 1.2rem 1.75rem;
    /* width: 14rem; */
    gap: 1.5rem;
  }

  @media (min-width: ${breakpoints.lgLaptop}) {
    padding: 1rem 1.2rem;
    /* width: 15rem; */
    gap: 1.6rem;
  }
`;

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
`;

const StyledDate = styled.div`
  font-size: 0.55rem;
  color: #6b7280;

  @media (min-width: ${breakpoints.mdMobile}) {
    font-size: 0.55rem;
  }

  @media (min-width: ${breakpoints.lgMobile}) {
    font-size: 0.55rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 0.7rem;
  }

  @media (min-width: ${breakpoints.smLaptop}) {
    font-size: 0.8rem;
  }
`;

const StyledTime = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #430199ff;

  @media (min-width: ${breakpoints.mdMobile}) {
    font-size: 0.8rem;
  }

  @media (min-width: ${breakpoints.lgMobile}) {
    font-size: 0.85rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
  }

  @media (min-width: ${breakpoints.smLaptop}) {
    font-size: 1.2rem;
  }
`;

const StyledClockIcon = styled(Clock)`
  flex-shrink: 0;
  stroke: #5f00d9;
  stroke-width: 1.7;

  width: 20px;
  height: 20px;

  @media (min-width: ${breakpoints.mdMobile}) {
    width: 22px;
    height: 22px;
  }

  @media (min-width: ${breakpoints.lgMobile}) {
    width: 24px;
    height: 24px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: 26px;
    height: 26px;
  }

  @media (min-width: ${breakpoints.smLaptop}) {
    width: 28px;
    height: 28px;
  }

  @media (min-width: ${breakpoints.mdLaptop}) {
    width: 30px;
    height: 30px;
  }

  @media (min-width: ${breakpoints.lgLaptop}) {
    width: 32px;
    height: 32px;
  }
`;

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <ClockContainer>
      <StyledClockIcon />
      <TimeSection>
        <StyledDate>{formattedDate}</StyledDate>
        <StyledTime>{formattedTime}</StyledTime>
      </TimeSection>
    </ClockContainer>
  );
};

export default LiveClock;
