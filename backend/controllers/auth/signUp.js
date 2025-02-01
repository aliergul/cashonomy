const User = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");
const sendErrorResponse = require("../../utils/sendErrorResponse");

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    const accessToken = generateToken(user._id);

    return res.status(201).json({
      error: false,
      user,
      accessToken,
      message: "Registration Successful",
    });
  } catch (err) {
    return sendErrorResponse(
      res,
      "Unexpected error at mongo save user.",
      "UNEXPECTED_ERROR",
      true
    );
  }
};
