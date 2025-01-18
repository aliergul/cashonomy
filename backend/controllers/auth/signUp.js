const User = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");
const sendErrorResponse = require("../../utils/sendErrorResponse");

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return sendErrorResponse(
      res,
      "User name can not be empty.",
      "MISSING_USERNAME"
    );
  }

  if (!email) {
    return sendErrorResponse(res, "Email can not be empty.", "MISSING_EMAIL");
  }

  if (!password) {
    return sendErrorResponse(
      res,
      "Password can not be empty.",
      "MISSING_PASSWORD"
    );
  }

  const alreadySignedEmail = await User.findOne({ email: email });
  const alreadySignedUsername = await User.findOne({ username: username });

  if (alreadySignedEmail) {
    return sendErrorResponse(
      res,
      "Email already exists.",
      "EMAIL_ALREADY_EXISTS"
    );
  }

  if (alreadySignedUsername) {
    return sendErrorResponse(
      res,
      "Username already exists.",
      "USERNAME_ALREADY_EXISTS"
    );
  }

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
