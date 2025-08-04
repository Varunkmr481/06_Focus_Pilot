import { useEffect, useState } from "react";
import Leaderboard from "../components/LeaderBoard";

const Rank = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      // 1. Get the token
      const token = localStorage.getItem("token");

      // 2. send http request
      const res = await fetch("http://localhost:8000/getAllUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      // 3. Get the res
      const data = await res.json();

      console.log(data.users);
      setUsers(data.users);
    }

    getAllUsers();
  }, []);

  return <Leaderboard users={users}></Leaderboard>;
};

export default Rank;
