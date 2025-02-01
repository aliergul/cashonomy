const { body, validationResult } = require("express-validator");
const sendErrorResponse = require("../utils/sendErrorResponse");
const errorMessagesUser = require("../utils/errorMessagesUser");
const User = require("../models/user.model");

const validateSignUp = [
  body("username")
    .notEmpty()
    .withMessage("MISSING_USERNAME_SIGNUP")
    .isLength({ min: 3 })
    .withMessage("INVALID_USERNAME_SIGNUP"),

  body("email")
    .notEmpty()
    .withMessage("MISSING_EMAIL_SIGNUP")
    .isEmail()
    .withMessage("INVALID_EMAIL_SIGNUP"),

  body("password")
    .notEmpty()
    .withMessage("MISSING_PASSWORD")
    .isLength({ min: 6 })
    .withMessage("INVALID_PASSWORD"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      const errorCode = firstError.msg;
      const errorMessage =
        errorMessagesUser[errorCode] || "Invalid login request.";

      return sendErrorResponse(res, errorMessage, errorCode);
    }

    try {
      const { username, email } = req.body;
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return sendErrorResponse(
            res,
            "Email already exists.",
            "EMAIL_ALREADY_EXISTS"
          );
        }
        if (existingUser.username === username) {
          return sendErrorResponse(
            res,
            "Username already exists.",
            "USERNAME_ALREADY_EXISTS"
          );
        }
      }

      next();
    } catch (error) {
      return sendErrorResponse(
        res,
        "Error checking existing users.",
        "CHECK_ERROR"
      );
    }
  },
];

module.exports = validateSignUp;
