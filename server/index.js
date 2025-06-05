const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up & running ",
  });
});

app.post("/register", (req, res) => {
  const data = req.body;
  console.log("data", data);

  res.status(200).json({
    message: "Submitted form data",
    data: data,
  });
});

app.listen(port, () => {
  console.log("Server running on port ", port);
});
