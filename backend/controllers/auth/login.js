const User = require("../../models/user.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const generateToken = require("../../utils/generateToken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!password) {
    return sendErrorResponse(res, "Password is required", "MISSING_PASSWORD");
  }

  try {
    const userInfo = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });

    if (!userInfo) {
      return sendErrorResponse(
        res,
        "Username or email is wrong",
        "USER_NOT_FOUND"
      );
    }

    const isPasswordCorrect = userInfo.authenticate(password);

    if (!isPasswordCorrect) {
      return sendErrorResponse(res, "Password is wrong", "WRONG_PASSWORD");
    }

    const accessToken = generateToken(userInfo._id);

    return res.status(200).json({
      error: false,
      message: "Login Successful",
      user: {
        id: userInfo._id,
        username: userInfo.username,
        email: userInfo.email,
      },
      accessToken,
    });
  } catch (error) {
    return sendErrorResponse(
      res,
      "Unexpected error during login.",
      "UNEXPECTED_ERROR",
      true
    );
  }
};
