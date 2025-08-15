// import styled from "styled-components";

// const StyledContainer = styled.div`
//   font-family: "Poppins", sans-serif;
//   overflow-x: scroll;
//   padding: 1rem;
//   text-align: center;
//   background: linear-gradient(to right, #f9f9f9, #f0f0f0);
//   border-radius: 12px;
//   box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
//   width: 100%;

//   @media (min-width: 480px) {
//     padding: 1.5rem;
//   }

//   @media (min-width: 768px) {
//     padding: 2rem;
//   }

//   @media (min-width: 1024px) {
//     padding: 3rem;
//   }
// `;

// const Title = styled.h2`
//   font-size: 1.4rem;
//   margin-bottom: 0.3rem;
//   color: #333;

//   @media (min-width: 480px) {
//     font-size: 1.6rem;
//   }

//   @media (min-width: 768px) {
//     font-size: 2rem;
//   }
// `;

// const Subtext = styled.p`
//   color: #d7263d;
//   font-size: 0.9rem;
//   margin-bottom: 2rem;

//   @media (min-width: 480px) {
//     font-size: 1rem;
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   margin: 0 auto;
//   border-collapse: collapse;
//   background: rgba(255, 255, 255, 0.6);
//   backdrop-filter: blur(6px);
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
//   font-size: 0.8rem;

//   @media (min-width: 480px) {
//     font-size: 0.9rem;
//   }

//   @media (min-width: 768px) {
//     font-size: 1rem;
//     width: 90%;
//   }

//   @media (min-width: 1024px) {
//     width: 80%;
//   }
// `;

// const Th = styled.th`
//   background-color: #eeeeee;
//   font-weight: 600;
//   padding: 10px;
//   font-size: 0.9rem;
//   color: #333;
//   border-bottom: 2px solid #ccc;

//   @media (min-width: 480px) {
//     font-size: 1rem;
//     padding: 12px;
//   }
// `;

// const Td = styled.td`
//   padding: 8px;
//   border-bottom: 1px solid #ddd;
//   font-size: 0.85rem;

//   @media (min-width: 480px) {
//     padding: 10px;
//     font-size: 0.95rem;
//   }
// `;

// export const Badge = styled.span`
//   display: inline-block;
//   padding: 5px 10px;
//   border-radius: 20px;
//   font-size: 0.7rem;
//   font-weight: 600;
//   color: white;
//   margin: 0.2rem;
//   box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
//   white-space: nowrap;

//   @media (min-width: 480px) {
//     font-size: 0.75rem;
//     padding: 6px 14px;
//   }

//   &.Beginner {
//     background-color: #dc8839;
//   }
//   &.Novice {
//     background-color: #4caf50;
//   }
//   &.Apprentice {
//     background-color: #2196f3;
//   }
//   &.Journeyman {
//     background-color: #ff9800;
//   }
//   &.Expert {
//     background-color: #e91e63;
//   }
//   &.Master {
//     background-color: #a81bd7;
//   }
//   &.Champion {
//     background-color: #009688;
//   }
//   &.Hero {
//     background-color: #ff5722;
//   }
//   &.Legend {
//     background-color: #795548;
//   }
//   &.Mythic {
//     background-color: #607d8b;
//   }
//   &.Guardian {
//     background-color: #3f51b5;
//   }
//   &.Pioneer {
//     background-color: #00bcd4;
//   }
//   &.Vanguard {
//     background-color: #ff0707;
//   }
//   &.Trailblazer {
//     background-color: #8bc34a;
//   }
//   &.Overlord {
//     background-color: #f44336;
//   }
//   &.Immortal {
//     background-color: #673ab7;
//   }
// `;

// const Milestones = () => {
//   const data = [
//     ["0", "Beginner", "🎖️", 0],
//     ["1", "Novice", "🎖️", 50],
//     ["2", "Apprentice", "🌟", 250],
//     ["3", "Journeyman", "🏅", 500],
//     ["4", "Expert", "🔥", 800],
//     ["5", "Master", "👑", 750],
//     ["6", "Champion", "🏆", 1000],
//     ["7", "Hero", "⚔️", 1200],
//     ["8", "Legend", "🌌", 1700],
//     ["9", "Mythic", "✨", 2400],
//     ["10", "Guardian", "🛡️", 3200],
//     ["11", "Pioneer", "🚀", 3900],
//     ["12", "Vanguard", "⚡", 4500],
//     ["13", "Trailblazer", "🌍", 6000],
//     ["14", "Overlord", "💥", 7500],
//     ["15", "Immortal", "🌟", 9000],
//   ];

//   return (
//     <StyledContainer>
//       <Title>Milestone Badges</Title>
//       <Subtext>
//         Points are awarded based on total <strong>focus hours</strong>{" "}
//         accumulated.
//       </Subtext>
//       <Table>
//         <thead>
//           <tr>
//             <Th>Level</Th>
//             <Th>Name</Th>
//             <Th>Badge</Th>
//             <Th>Points</Th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(([level, name, emoji, points]) => (
//             <tr key={level}>
//               <Td>{level}</Td>
//               <Td>{name}</Td>
//               <Td>
//                 <Badge className={name}>
//                   {emoji} {name}
//                 </Badge>
//               </Td>
//               <Td>{points}</Td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </StyledContainer>
//   );
// };

// export default Milestones;

import styled from "styled-components";

const StyledContainer = styled.div`
  font-family: "Poppins", sans-serif;
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(150%);
  border-radius: 16px;
  background: linear-gradient(135deg, #d9e4f5 0%, #f7d9e3 100%);
  /* box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15); */
  width: 100%;
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

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
  background: linear-gradient(90deg, #7f00ff, #e100ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

const Subtext = styled.p`
  color: rgba(0, 0, 0, 0.85);
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  font-size: 0.95rem;

  @media (min-width: 768px) {
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 80%;
  }
`;

const Th = styled.th`
  background: linear-gradient(135deg, #7f00ff, #e100ff);
  font-weight: 600;
  padding: 14px;
  font-size: 1rem;
  color: white;
  border-bottom: 2px solid rgba(255, 255, 255, 0.15);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid rgba(98, 0, 255, 0.14);
  font-size: 0.95rem;
  color: black;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
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

const Milestones = () => {
  const data = [
    ["0", "Beginner", "🎖️", 0],
    ["1", "Novice", "🎖️", 50],
    ["2", "Apprentice", "🌟", 250],
    ["3", "Journeyman", "🏅", 500],
    ["4", "Expert", "🔥", 800],
    ["5", "Master", "👑", 750],
    ["6", "Champion", "🏆", 1000],
    ["7", "Hero", "⚔️", 1200],
    ["8", "Legend", "🌌", 1700],
    ["9", "Mythic", "✨", 2400],
    ["10", "Guardian", "🛡️", 3200],
    ["11", "Pioneer", "🚀", 3900],
    ["12", "Vanguard", "⚡", 4500],
    ["13", "Trailblazer", "🌍", 6000],
    ["14", "Overlord", "💥", 7500],
    ["15", "Immortal", "🌟", 9000],
  ];

  return (
    <StyledContainer>
      <Title>Milestone Badges</Title>
      <Subtext>
        Points are awarded based on total <strong>focus hours</strong>{" "}
        accumulated.
      </Subtext>
      <Table>
        <thead>
          <tr>
            <Th>Level</Th>
            <Th>Name</Th>
            <Th>Badge</Th>
            <Th>Points</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(([level, name, emoji, points]) => (
            <tr key={level}>
              <Td>{level}</Td>
              <Td>{name}</Td>
              <Td>
                <Badge className={name}>
                  {emoji} {name}
                </Badge>
              </Td>
              <Td>{points}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledContainer>
  );
};

export default Milestones;
