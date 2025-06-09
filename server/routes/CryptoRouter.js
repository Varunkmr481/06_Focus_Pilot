const { ensureAuthenticated } = require("../middlewares/Auth");
const User = require("../model/User");

const cryptoRouter = require("express").Router();

cryptoRouter.get("/", ensureAuthenticated, async (req, res) => {
  const user = await User.find({ email: req.user.email });
  console.log(user[0]);

  return res.status(200).json({
    message: "Crypto Dashboard",
    name: user[0].name,
    email: user[0].email,
  });
});

module.exports = cryptoRouter;
