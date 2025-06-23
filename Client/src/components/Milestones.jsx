import styled from "styled-components";

const StyledContainer = styled.div`
  font-family: Arial, sans-serif;
  /* margin: 20px; */
  font-size: 0.7rem;

  & > h2 {
    margin-bottom: 0.3rem;
  }

  & > p {
    margin-bottom: 1.5rem;
  }

  & > table {
    width: 80%;
    margin: 0 auto;
    border-collapse: collapse;
    text-align: center;
  }

  & > th,
  td {
    border: 2px solid #ddd;
    padding: 10px;
  }

  & > th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  @media (min-width: 768px) {
    font-size: 1.2rem;
    padding: 13px;
  }
`;

const Head = styled.td`
  font-weight: 600;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  font-size: 0.6rem;
  border-radius: 5px;
  color: white;
  /* font-size: 14px; */

  &.Beginner {
    background-color: rgb(220, 136, 57);
  }
  &.Novice {
    background-color: #4caf50;
  }
  &.Apprentice {
    background-color: #2196f3;
  }
  &.Journeyman {
    background-color: #ff9800;
  }
  &.Expert {
    background-color: #e91e63;
  }
  &.Master {
    background-color: rgb(168, 27, 215);
  }
  &.Champion {
    background-color: #009688;
  }
  &.Hero {
    background-color: #ff5722;
  }
  &.Legend {
    background-color: #795548;
  }
  &.Mythic {
    background-color: #607d8b;
  }
  &.Guardian {
    background-color: #3f51b5;
  }
  &.Pioneer {
    background-color: #00bcd4;
  }
  &.Vanguard {
    background-color: rgb(255, 7, 7);
  }
  &.Trailblazer {
    background-color: #8bc34a;
  }
  &.Overlord {
    background-color: #f44336;
  }
  &.Immortal {
    background-color: #673ab7;
  }

  @media (min-width: 768px) {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const Milestones = () => {
  return (
    <StyledContainer>
      <h2>Badges with Level Names</h2>
      <p style={{ color: "red", fontSize: ".9rem" }}>
        Points are awarded based on the total focus hours accumulated to date.
      </p>
      <table>
        <thead>
          <tr>
            <Head>Level No.</Head>
            <Head>Level Name</Head>
            <Head>Badge</Head>
            <Head>Points</Head>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>Beginner</td>
            <td>
              <Badge className="Beginner">🎖️ Novice</Badge>
            </td>
            <td>0</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Novice</td>
            <td>
              <Badge className="Novice">🎖️ Novice</Badge>
            </td>
            <td>100</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Apprentice</td>
            <td>
              <Badge className="Apprentice">🌟 Apprentice</Badge>
            </td>
            <td>250</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Journeyman</td>
            <td>
              <Badge className="Journeyman">🏅 Journeyman</Badge>
            </td>
            <td>475</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Expert</td>
            <td>
              <Badge className="Expert">🔥 Expert</Badge>
            </td>
            <td>775</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Master</td>
            <td>
              <Badge className="Master">👑 Master</Badge>
            </td>
            <td>1175</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Champion</td>
            <td>
              <Badge className="Champion">🏆 Champion</Badge>
            </td>
            <td>1675</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Hero</td>
            <td>
              <Badge className="Hero">⚔️ Hero</Badge>
            </td>
            <td>2275</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Legend</td>
            <td>
              <Badge className="Legend">🌌 Legend</Badge>
            </td>
            <td>2975</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Mythic</td>
            <td>
              <Badge className="Mythic">✨ Mythic</Badge>
            </td>
            <td>3875</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Guardian</td>
            <td>
              <Badge className="Guardian">🛡️ Guardian</Badge>
            </td>
            <td>4975</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Pioneer</td>
            <td>
              <Badge className="Pioneer">🚀 Pioneer</Badge>
            </td>
            <td>6275</td>
          </tr>
          <tr>
            <td>12</td>
            <td>Vanguard</td>
            <td>
              <Badge className="Vanguard">⚡ Vanguard</Badge>
            </td>
            <td>7775</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Trailblazer</td>
            <td>
              <Badge className="Trailblazer">🌍 Trailblazer</Badge>
            </td>
            <td>1200</td>
          </tr>
          <tr>
            <td>14</td>
            <td>Overlord</td>
            <td>
              <Badge className="Overlord">💥 Overlord</Badge>
            </td>
            <td>9475</td>
          </tr>
          <tr>
            <td>15</td>
            <td>Immortal</td>
            <td>
              <Badge className="Immortal">🌟 Immortal</Badge>
            </td>
            <td>11375</td>
          </tr>
        </tbody>
      </table>
    </StyledContainer>
  );
};

export default Milestones;
