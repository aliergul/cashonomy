const User = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const alreadySigned = await User.findOne({ email: email });
    const alreadySignedUsername = await User.findOne({ username: username });
    if (alreadySigned) {
      return res.status(400).json({
        error: "Email already signed up",
        errorCode: "",
      });
    }
    if (alreadySignedUsername) {
      return res.status(400).json({
        error: "Username already taken",
        errorCode: "",
      });
    }

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
    console.error(err);
    return res.status(500).json({
      error: true,
      errorCode: "",
      message: "Internal Server Error",
    });
  }
};
