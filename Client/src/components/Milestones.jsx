import styled from "styled-components";

const StyledContainer = styled.div`
  font-family: Arial, sans-serif;
  /* margin: 20px; */
  font-size: 0.7rem;

  & > h2 {
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

  &.badge-1 {
    background-color: #4caf50;
  }
  &.badge-2 {
    background-color: #2196f3;
  }
  &.badge-3 {
    background-color: #ff9800;
  }
  &.badge-4 {
    background-color: #e91e63;
  }
  &.badge-5 {
    background-color: #9c27b0;
  }
  &.badge-6 {
    background-color: #009688;
  }
  &.badge-7 {
    background-color: #ff5722;
  }
  &.badge-8 {
    background-color: #795548;
  }
  &.badge-9 {
    background-color: #607d8b;
  }
  &.badge-10 {
    background-color: #3f51b5;
  }
  &.badge-11 {
    background-color: #00bcd4;
  }
  &.badge-12 {
    background-color: #ffc107;
  }
  &.badge-13 {
    background-color: #8bc34a;
  }
  &.badge-14 {
    background-color: #f44336;
  }
  &.badge-15 {
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
            <td>1</td>
            <td>Novice</td>
            <td>
              <Badge className="badge-1">🎖️ Novice</Badge>
            </td>
            <td>100</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Apprentice</td>
            <td>
              <Badge className="badge-2">🌟 Apprentice</Badge>
            </td>
            <td>250</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Journeyman</td>
            <td>
              <Badge className="badge-3">🏅 Journeyman</Badge>
            </td>
            <td>475</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Expert</td>
            <td>
              <Badge className="badge-4">🔥 Expert</Badge>
            </td>
            <td>775</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Master</td>
            <td>
              <Badge className="badge-5">👑 Master</Badge>
            </td>
            <td>1175</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Champion</td>
            <td>
              <Badge className="badge-6">🏆 Champion</Badge>
            </td>
            <td>1675</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Hero</td>
            <td>
              <Badge className="badge-7">⚔️ Hero</Badge>
            </td>
            <td>2275</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Legend</td>
            <td>
              <Badge className="badge-8">🌌 Legend</Badge>
            </td>
            <td>2975</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Mythic</td>
            <td>
              <Badge className="badge-9">✨ Mythic</Badge>
            </td>
            <td>3875</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Guardian</td>
            <td>
              <Badge className="badge-10">🛡️ Guardian</Badge>
            </td>
            <td>4975</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Pioneer</td>
            <td>
              <Badge className="badge-11">🚀 Pioneer</Badge>
            </td>
            <td>6275</td>
          </tr>
          <tr>
            <td>12</td>
            <td>Vanguard</td>
            <td>
              <Badge className="badge-12">⚡ Vanguard</Badge>
            </td>
            <td>7775</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Trailblazer</td>
            <td>
              <Badge className="badge-13">🌍 Trailblazer</Badge>
            </td>
            <td>1200</td>
          </tr>
          <tr>
            <td>14</td>
            <td>Overlord</td>
            <td>
              <Badge className="badge-14">💥 Overlord</Badge>
            </td>
            <td>9475</td>
          </tr>
          <tr>
            <td>15</td>
            <td>Immortal</td>
            <td>
              <Badge className="badge-15">🌟 Immortal</Badge>
            </td>
            <td>11375</td>
          </tr>
        </tbody>
      </table>
    </StyledContainer>
  );
};

export default Milestones;
