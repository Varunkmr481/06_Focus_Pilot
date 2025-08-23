import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.08); }
`;

// Gradient shift animation
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Glow pulse
const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 8px 32px rgba(106, 32, 254, 0.4); }
  50% { box-shadow: 0 8px 42px rgba(89, 0, 255, 0.8); }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85%;
  width: 95%;
  gap: 15px;
  background: transparent;
`;

export const Blob = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 20px;

  /* background: linear-gradient(135deg, rgba(95, 0, 217), rgba(95, 0, 217)); */
  background: #5900df;
  background-size: 400% 400%;

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  animation: ${float} 2s ease-in-out infinite, ${gradientShift} 6s ease infinite,
    ${glowPulse} 2s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || "0s"};
`;

const PremiumLoader = () => {
  return (
    <LoaderWrapper>
      <Blob delay="0s" />
      <Blob delay="0.2s" />
      <Blob delay="0.4s" />
    </LoaderWrapper>
  );
};

export default PremiumLoader;
