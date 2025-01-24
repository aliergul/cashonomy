const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/user.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");

exports.googleAuth = async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if they don't exist
      user = await User.create({
        email,
        username: name || email.split("@")[0],
        authSource: "google",
      });
    }
    const userId = payload["sub"];
    const accessToken = generateToken(userId);

    return res
      .status(200)
      .cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production when using HTTPS
        maxAge: 3600000, // 1 hour in milliseconds,
      })
      .json({
        error: false,
        user,
        accessToken,
        message: "Google Registration Successful",
      });
  } catch (err) {
    return sendErrorResponse(
      res,
      "Unexpected error at google authentication.",
      "GOOGLE_UNEXPECTED_ERROR"
    );
  }
};
