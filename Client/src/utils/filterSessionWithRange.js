import toast from "react-hot-toast";

async function filterSessionWithRange(range, setSessionData) {
  try {
    // 1. Extract the token
    const token = localStorage.getItem("token");

    // 2. Send the api request
    const res = await fetch(
      `http://localhost:8000/session/filter?range=${range}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      if (data.sessions.length === 0) {
        setSessionData(data.sessions);
        toast.error("No sessions found!");
      } else {
        setSessionData(data.sessions);
        toast.success("Session filtered!");
      }
    } else {
      toast.error("Failed to fetch sessions");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

export default filterSessionWithRange;
