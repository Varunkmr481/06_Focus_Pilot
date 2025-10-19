import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import styled, { css, keyframes } from "styled-components";
import MyRankDetailsBox from "./MyRankDetailsBox";
import Loader2 from "./Loader2";

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
  margin: 0 auto 1rem auto;
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

const blink = keyframes`
0%{
  border-color: rgba(95, 0, 217, 1);
}
50%{
   border-color: rgba(95, 0, 217, 0.2);
}
100% {
    border-color: rgba(95, 0, 217, 1);
}
`;

const Tr = styled.tr`
  transition: background 0.2s ease-in-out;
  background: ${({ $rank }) => {
    if ($rank === 1) {
      return "rgba(255, 215, 0, 0.25)";
    }

    if ($rank === 2) {
      return "rgba(192, 192, 192, 0.25)";
    }

    if ($rank === 3) {
      return "rgba(205, 127, 50, 0.25)";
    }
  }};

  /* Highlight the current user with a border and bolder text */
  border: ${({ $isCurrentUser }) =>
    $isCurrentUser ? "3px solid #5f00d9" : "none"};
  font-weight: ${({ $isCurrentUser }) => ($isCurrentUser ? "bold" : "normal")};

  ${({ $isCurrentUser }) =>
    $isCurrentUser &&
    css`
      animation: ${blink} 2s infinite ease-in-out;
    `}

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const TableContainer = styled.div`
  /* max-height: 50vh; */
  /* position: relative; */
  height: 58vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 1rem;
  color: #555;
`;

export default function Leaderboard({ users }) {
  const [myRankData, setMyRankData] = useState({});
  const [topUsers, setTopUsers] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // Effect to fetch the main leaderboard data with infinite scrolling
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:8000/leaderboard?limit=10`,
          {
            method: "GET",
            headers: {
              authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setMyRankData(() => {
            return {
              id: data.currUser._id,
              rank: data.currUser.rank,
              name: data.currUser.name,
              badge: data.currUser.currentBadge,
              trophy: data.currUser.currentTrophy,
              focusHours: data.currUser.totalHours,
            };
          });
          setTopUsers([...data.topUsers]);
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader2 label="Preparing leaderboard..." />
      ) : (
        <Container>
          <Title>🏆 Top {topUsers?.length} Performers</Title>

          <Subtext> </Subtext>

          <TableContainer>
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
                {topUsers.map((user) => (
                  <Tr
                    key={user._id}
                    $rank={user.rank}
                    $isCurrentUser={user._id === myRankData.id}
                  >
                    <Td>#{user.rank}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.currentBadge}</Td>
                    <Td>{user.currentTrophy}</Td>
                    <Td>
                      {user.totalHours.toFixed(2)}{" "}
                      {user.totalHours <= 1 ? "hr" : "hrs"}
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          <MyRankDetailsBox
            userDetails={{
              ...myRankData,
              focusHours: myRankData?.focusHours?.toFixed(2),
            }}
          ></MyRankDetailsBox>
        </Container>
      )}
    </>
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
