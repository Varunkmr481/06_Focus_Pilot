import styled from "styled-components";

const Container = styled.div`
  /* max-width: 900px; */
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  overflow-x: scroll;

  /* Scrollbar hide */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 900;
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
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  text-align: center;

  @media (min-width: 768px) {
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 80%;
  }
`;

const Thead = styled.thead`
  background: rgba(255, 255, 255, 0.15);
`;

const Th = styled.th`
  /* background: linear-gradient(135deg, #7f00ff, #e100ff); */
  padding: 1rem;
  font-weight: 600;
  font-size: 1rem;
  color: #020202ff;
`;

const Td = styled.td`
  padding: 1rem;
  font-size: 0.95rem;
  color: #000000ff;
`;

const Tr = styled.tr`
  transition: background 0.2s ease-in-out;
  background: ${({ rank }) =>
    rank === 1
      ? "rgba(255, 215, 0, 0.25)" // Gold
      : rank === 2
      ? "rgba(192, 192, 192, 0.25)" // Silver
      : rank === 3
      ? "rgba(205, 127, 50, 0.25)" // Bronze
      : "transparent"};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export default function Leaderboard({ users }) {
  const sortedUsers = [...users].sort((a, b) => b.totalHours - a.totalHours);

  return (
    <Container>
      <Title>🏆 Focus Leaderboard</Title>
      <Subtext>
        Rankings are based on total <strong>focus hours</strong> earned by
        users.
      </Subtext>

      <Table>
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Badge</Th>
            <Th>Trophy</Th>
            <Th>Focus Hours</Th>
          </Tr>
        </Thead>

        <tbody>
          {sortedUsers.map((user, index) => (
            <Tr key={user._id} rank={index + 1}>
              <Td>#{index + 1}</Td>
              <Td>{user.name}</Td>
              <Td>{user.currentBadge}</Td>
              <Td>{user.currentTrophy}</Td>
              <Td>{user.totalHours.toFixed(2)} hrs</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

// import React from "react";
// import styled from "styled-components";

// const Container = styled.div`
//   max-width: 800px;
//   margin: 2rem auto;
//   padding: 1.5rem;
// `;

// const Title = styled.h1`
//   text-align: center;
//   font-size: 2rem;
//   font-weight: bold;
//   margin-bottom: 1.5rem;
//   color: #333;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: #fff;
//   border-radius: 12px;
//   overflow: hidden;
//   box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
// `;

// const Thead = styled.thead`
//   background-color: #f5f5f5;
// `;

// const Th = styled.th`
//   text-align: left;
//   padding: 1rem;
//   font-weight: 600;
//   font-size: 0.95rem;
//   color: #555;
// `;

// const Td = styled.td`
//   padding: 1rem;
//   font-size: 0.95rem;
//   color: #444;
// `;

// const Tr = styled.tr`
//   border-top: 1px solid #eee;
//   background: ${({ rank }) =>
//     rank === 1
//       ? "#fffbe6"
//       : rank === 2
//       ? "#f0f0f0"
//       : rank === 3
//       ? "#fff0e6"
//       : "#fff"};
//   font-weight: ${({ rank }) => (rank === 1 ? "600" : "normal")};
// `;

// export default function Leaderboard({ users }) {
//   const sortedUsers = [...users].sort((a, b) => b.totalHours - a.totalHours);

//   return (
//     <Container>
//       <Title>🏆 Focus Leaderboard</Title>
//       <Table>
//         <Thead>
//           <tr>
//             <Th>Rank</Th>
//             <Th>Name</Th>
//             <Th>Badge</Th>
//             <Th>Trophy</Th>
//             <Th style={{ textAlign: "right" }}>Focus Hours</Th>
//           </tr>
//         </Thead>
//         <tbody>
//           {sortedUsers.map((user, index) => (
//             <Tr key={user._id} rank={index + 1}>
//               <Td>#{index + 1}</Td>
//               <Td>{user.name}</Td>
//               <Td>{user.currentBadge}</Td>
//               <Td>{user.currentTrophy}</Td>
//               <Td style={{ textAlign: "right" }}>
//                 {user.totalHours.toFixed(2)} hrs
//               </Td>
//             </Tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }
