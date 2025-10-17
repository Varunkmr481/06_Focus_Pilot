import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled, { css, keyframes } from "styled-components";
import Loader2 from "./Loader2";

// --- Data Transformation (same as before) ---
const milestonesData = [
  { level: "0", name: "Beginner", emoji: "🌱", points: 0 },
  { level: "1", name: "Novice", emoji: "🎖️", points: 50 },
  { level: "2", name: "Apprentice", emoji: "💡", points: 250 },
  { level: "3", name: "Journeyman", emoji: "🏅", points: 500 },
  { level: "4", name: "Expert", emoji: "🔥", points: 800 },
  { level: "5", name: "Master", emoji: "👑", points: 750 },
  { level: "6", name: "Champion", emoji: "🏆", points: 1000 },
  { level: "7", name: "Hero", emoji: "⚔️", points: 1200 },
  { level: "8", name: "Legend", emoji: "🌌", points: 1700 },
  { level: "9", name: "Mythic", emoji: "✨", points: 2400 },
  { level: "10", name: "Guardian", emoji: "🛡️", points: 3200 },
  { level: "11", name: "Pioneer", emoji: "🚀", points: 3900 },
  { level: "12", name: "Vanguard", emoji: "⚡", points: 4500 },
  { level: "13", name: "Trailblazer", emoji: "🌍", points: 6000 },
  { level: "14", name: "Overlord", emoji: "💥", points: 7500 },
  { level: "15", name: "Immortal", emoji: "🌟", points: 9000 },
];

// --- Styles for each badge color glow ---
const badgeGlows = {
  Beginner: keyframes`
    0% { box-shadow: 0 0 5px #dc8839, 0 0 10px rgba(220, 136, 57, 0.5); }
    50% { box-shadow: 0 0 15px #dc8839, 0 0 20px rgba(220, 136, 57, 0.8); }
    100% { box-shadow: 0 0 5px #dc8839, 0 0 10px rgba(220, 136, 57, 0.5); }
  `,
  Novice: keyframes`
    0% { box-shadow: 0 0 5px #4caf50, 0 0 10px rgba(76, 175, 80, 0.5); }
    50% { box-shadow: 0 0 15px #4caf50, 0 0 20px rgba(76, 175, 80, 0.8); }
    100% { box-shadow: 0 0 5px #4caf50, 0 0 10px rgba(76, 175, 80, 0.5); }
  `,
  Apprentice: keyframes`
    0% { box-shadow: 0 0 5px #2196f3, 0 0 10px rgba(33, 150, 243, 0.5); }
    50% { box-shadow: 0 0 15px #2196f3, 0 0 20px rgba(33, 150, 243, 0.8); }
    100% { box-shadow: 0 0 5px #2196f3, 0 0 10px rgba(33, 150, 243, 0.5); }
  `,
  Journeyman: keyframes`
    0% { box-shadow: 0 0 5px #ff9800, 0 0 10px rgba(255, 152, 0, 0.5); }
    50% { box-shadow: 0 0 15px #ff9800, 0 0 20px rgba(255, 152, 0, 0.8); }
    100% { box-shadow: 0 0 5px #ff9800, 0 0 10px rgba(255, 152, 0, 0.5); }
  `,
  Expert: keyframes`
    0% { box-shadow: 0 0 5px #e91e63, 0 0 10px rgba(233, 30, 99, 0.5); }
    50% { box-shadow: 0 0 15px #e91e63, 0 0 20px rgba(233, 30, 99, 0.8); }
    100% { box-shadow: 0 0 5px #e91e63, 0 0 10px rgba(233, 30, 99, 0.5); }
  `,
  Master: keyframes`
    0% { box-shadow: 0 0 5px #a81bd7, 0 0 10px rgba(168, 27, 215, 0.5); }
    50% { box-shadow: 0 0 15px #a81bd7, 0 0 20px rgba(168, 27, 215, 0.8); }
    100% { box-shadow: 0 0 5px #a81bd7, 0 0 10px rgba(168, 27, 215, 0.5); }
  `,
  Champion: keyframes`
    0% { box-shadow: 0 0 5px #009688, 0 0 10px rgba(0, 150, 136, 0.5); }
    50% { box-shadow: 0 0 15px #009688, 0 0 20px rgba(0, 150, 136, 0.8); }
    100% { box-shadow: 0 0 5px #009688, 0 0 10px rgba(0, 150, 136, 0.5); }
  `,
  Hero: keyframes`
    0% { box-shadow: 0 0 5px #ff5722, 0 0 10px rgba(255, 87, 34, 0.5); }
    50% { box-shadow: 0 0 15px #ff5722, 0 0 20px rgba(255, 87, 34, 0.8); }
    100% { box-shadow: 0 0 5px #ff5722, 0 0 10px rgba(255, 87, 34, 0.5); }
  `,
  Legend: keyframes`
    0% { box-shadow: 0 0 5px #795548, 0 0 10px rgba(121, 85, 72, 0.5); }
    50% { box-shadow: 0 0 15px #795548, 0 0 20px rgba(121, 85, 72, 0.8); }
    100% { box-shadow: 0 0 5px #795548, 0 0 10px rgba(121, 85, 72, 0.5); }
  `,
  Mythic: keyframes`
    0% { box-shadow: 0 0 5px #607d8b, 0 0 10px rgba(96, 125, 139, 0.5); }
    50% { box-shadow: 0 0 15px #607d8b, 0 0 20px rgba(96, 125, 139, 0.8); }
    100% { box-shadow: 0 0 5px #607d8b, 0 0 10px rgba(96, 125, 139, 0.5); }
  `,
  Guardian: keyframes`
    0% { box-shadow: 0 0 5px #3f51b5, 0 0 10px rgba(63, 81, 181, 0.5); }
    50% { box-shadow: 0 0 15px #3f51b5, 0 0 20px rgba(63, 81, 181, 0.8); }
    100% { box-shadow: 0 0 5px #3f51b5, 0 0 10px rgba(63, 81, 181, 0.5); }
  `,
  Pioneer: keyframes`
    0% { box-shadow: 0 0 5px #00bcd4, 0 0 10px rgba(0, 188, 212, 0.5); }
    50% { box-shadow: 0 0 15px #00bcd4, 0 0 20px rgba(0, 188, 212, 0.8); }
    100% { box-shadow: 0 0 5px #00bcd4, 0 0 10px rgba(0, 188, 212, 0.5); }
  `,
  Vanguard: keyframes`
    0% { box-shadow: 0 0 5px #ff0707, 0 0 10px rgba(255, 7, 7, 0.5); }
    50% { box-shadow: 0 0 15px #ff0707, 0 0 20px rgba(255, 7, 7, 0.8); }
    100% { box-shadow: 0 0 5px #ff0707, 0 0 10px rgba(255, 7, 7, 0.5); }
  `,
  Trailblazer: keyframes`
    0% { box-shadow: 0 0 5px #8bc34a, 0 0 10px rgba(139, 195, 74, 0.5); }
    50% { box-shadow: 0 0 15px #8bc34a, 0 0 20px rgba(139, 195, 74, 0.8); }
    100% { box-shadow: 0 0 5px #8bc34a, 0 0 10px rgba(139, 195, 74, 0.5); }
  `,
  Overlord: keyframes`
    0% { box-shadow: 0 0 5px #f44336, 0 0 10px rgba(244, 67, 54, 0.5); }
    50% { box-shadow: 0 0 15px #f44336, 0 0 20px rgba(244, 67, 54, 0.8); }
    100% { box-shadow: 0 0 5px #f44336, 0 0 10px rgba(244, 67, 54, 0.5); }
  `,
  Immortal: keyframes`
    0% { box-shadow: 0 0 5px #673ab7, 0 0 10px rgba(103, 58, 183, 0.5); }
    50% { box-shadow: 0 0 15px #673ab7, 0 0 20px rgba(103, 58, 183, 0.8); }
    100% { box-shadow: 0 0 5px #673ab7, 0 0 10px rgba(103, 58, 183, 0.5); }
  `,
};

// --- Glow effect animation ---
const glow = keyframes`
  0% { 
    box-shadow: 0 0 5px rgba(127, 0, 255, 0.5), 0 0 10px rgba(225, 0, 255, 0.3);
    scale : 1.03;
  }
  50% { box-shadow: 0 0 15px rgba(127, 0, 255, 0.8), 0 0 20px rgba(225, 0, 255, 0.5); 
    scale : 1;
  }
  100% { box-shadow: 0 0 5px rgba(127, 0, 255, 0.5), 0 0 10px rgba(225, 0, 255, 0.3); 
    scale : 1.03;
  }
`;

const purpleGlow = keyframes`
0% { 
  box-shadow: 0 0 8px #a81bd7, 0 0 12px rgba(168, 27, 215, 0.5); 
  /* scale : 1; */
}
50% { 
  box-shadow: 0 0 16px #a81bd7, 0 0 20px rgba(168, 27, 215, 0.8); 
  /* scale: 1.01; */
}
100% { 
  box-shadow: 0 0 8px #a81bd7, 0 0 12px rgba(168, 27, 215, 0.5); 
  /* scale: 1; */
  }
`;

const glowOneColor = keyframes`
0%{
  box-shadow: 0 0 15px 2px #5f00d9;
}
50%{box-shadow : 0 0 15px 2px #9266cb86}
100%{
  box-shadow: 0 0 15px 2px #5f00d9;
}
`;

// --- Existing & New Styles ---
const StyledContainer = styled.div`
  font-family: "Poppins", sans-serif;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(12px) saturate(150%);
  border-radius: 16px;
  background: linear-gradient(135deg, #d9e4f5 0%, #f7d9e3 100%);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  max-width: 100%;
  animation: fadeIn 0.3s ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 550;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #7f00ff, #e100ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const Subtext = styled.p`
  color: rgba(0, 0, 0, 0.85);
  font-size: 1rem;
  margin-bottom: 2rem;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  margin: 0.2rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  backdrop-filter: blur(4px);
  &.Beginner {
    background: #dc8839;
  }
  &.Novice {
    background: #4caf50;
  }
  &.Apprentice {
    background: #2196f3;
  }
  &.Journeyman {
    background: #ff9800;
  }
  &.Expert {
    background: #e91e63;
  }
  &.Master {
    background: #a81bd7;
  }
  &.Champion {
    background: #009688;
  }
  &.Hero {
    background: #ff5722;
  }
  &.Legend {
    background: #795548;
  }
  &.Mythic {
    background: #607d8b;
  }
  &.Guardian {
    background: #3f51b5;
  }
  &.Pioneer {
    background: #00bcd4;
  }
  &.Vanguard {
    background: #ff0707;
  }
  &.Trailblazer {
    background: #8bc34a;
  }
  &.Overlord {
    background: #f44336;
  }
  &.Immortal {
    background: #673ab7;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
`;

// --- Updated Card Styles ---
const Card = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.38) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  animation: ${({ $isCurrentMilestone }) =>
    $isCurrentMilestone &&
    css`
      ${purpleGlow} 2s infinite ease-in-out
    `};

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.15);
    z-index: 10;
    animation: ${({ $milestoneName }) =>
      $milestoneName &&
      css`
        ${badgeGlows[$milestoneName]} 1.5s infinite alternate ease-in-out;
      `};
    cursor: pointer;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CardLevel = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
`;

const CardName = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
`;

const CardEmoji = styled.div`
  font-size: 3rem;
  margin: 1rem 0;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));
  transition: transform 0.3s ease-in-out;
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const CardPoints = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #7f00ff;
  background: rgba(127, 0, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem 1rem;
`;

// --- The Main Component ---
const Milestones = () => {
  const [currentBadge, setCurrentBadge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        setIsLoading(true);

        const res = await fetch("http://localhost:8000/currentUser", {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.success) {
          console.log(data);
          setCurrentBadge(data.currentUser.currentBadge);
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }

    getCurrentUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader2 label="Preparing your milestones..." />
      ) : (
        <StyledContainer>
          <Title>🏆 Milestone Badges</Title>

          <Subtext>
            Points are awarded based on total <strong>focus hours</strong>{" "}
            accumulated.
          </Subtext>

          <CardGrid>
            {milestonesData.map((milestone) => (
              <Card
                key={milestone.level}
                $milestoneName={milestone.name}
                $isCurrentMilestone={milestone.name === currentBadge}
              >
                <CardHeader>
                  <CardLevel>Level {milestone.level}</CardLevel>
                </CardHeader>
                <CardEmoji>{milestone.emoji}</CardEmoji>
                <Badge className={milestone.name}>{milestone.name}</Badge>
                <CardPoints>{milestone.points} pts</CardPoints>
              </Card>
            ))}
          </CardGrid>
        </StyledContainer>
      )}
    </>
  );
};

export default Milestones;
