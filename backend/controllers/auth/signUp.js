const User = require("../../models/user.model");

exports.signUp = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName) {
    return res
      .status(400)
      .json({ error: true, message: "User name can not be empty" });
  }

  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: "Email can not be empty" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password can not be empty" });
  }
};
