// Loader2.jsx
import styled, { keyframes, css } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 14px rgba(120,82,255,0.35); }
  50% { box-shadow: 0 0 28px rgba(255,0,180,0.55); }
`;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 99%;
  height: 80%;
`;

const GlassRing = styled.div`
  --size: ${({ size }) => size || "64px"};

  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);
  animation: ${pulse} 2.2s ease-in-out infinite;

  &::before {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: inherit;
    background: conic-gradient(from 0deg, #7000ff, #00d4ff, #7000ff);
    animation: ${spin} 1.4s linear infinite;
    mask: radial-gradient(circle at center, transparent 62%, black 63%);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 6px;
    border-radius: inherit;
    border: 2px solid transparent;
    border-top-color: #7000ff;
    border-right-color: #4805ff;
    border-bottom-color: #7000ff;
    animation: ${spin} 1s linear infinite;
  }
`;

// Label ke liye dynamic typing
const typing = (len) => keyframes`
  0% { width: 0 }
  40% { width: ${len}ch }
  60% { width: ${len}ch }
  100% { width: 0 }
`;

const Label = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: linear-gradient(90deg, #7000ff, #057eff, #7000ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  border-right: 2px solid rgba(112, 0, 255, 0.8);

  ${({ textLength }) => css`
    animation: ${typing(textLength)} 4s steps(${textLength}, end) infinite;
  `}
`;

const Loader2 = ({ size = "64px", label = "Preparing your dashboard..." }) => {
  return (
    <Wrapper role="status" aria-label="Loading">
      <GlassRing size={size} />
      {label && <Label textLength={label.length}>{label}</Label>}
    </Wrapper>
  );
};

export default Loader2;
