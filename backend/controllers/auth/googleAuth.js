const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/user.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");

exports.googleAuth = async (req, res) => {
  const client = new OAuth2Client();
  const { credential, clientId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const { email } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if they don't exist
      user = await User.create({
        email,
        authSource: "google",
      });
    }
    const userId = payload["sub"];
    const accessToken = generateToken(userId);

    res
      .status(200)
      .cookie("token", accessToken, {
        httpOnly: true,
        secure: false, // Set to true in production when using HTTPS
        maxAge: 3600000, // 1 hour in milliseconds
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
      "GOOGLE_UNEXPECTED_ERROR",
      true
    );
  }
};
