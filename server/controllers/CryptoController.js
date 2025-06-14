const home = async (req, res) => {
  const user = await User.find({ email: req.user.email });
  console.log(user[0]);

  return res.status(200).json({
    message: `${user[0].name} is authenticated user`,
    name: user[0].name,
    email: user[0].email,
  });
};

module.exports = { home };
