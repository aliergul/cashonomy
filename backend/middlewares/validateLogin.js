const { body, validationResult } = require("express-validator");
const errorMessagesUser = require("../utils/errorMessagesUser");
const sendErrorResponse = require("../utils/sendErrorResponse");

const validateLogin = [
  body("username")
    .notEmpty()
    .withMessage("MISSING_USERNAME_LOGIN")
    .isString()
    .withMessage("INVALID_USERNAME_LOGIN"),
  body("password").notEmpty().withMessage("MISSING_PASSWORD"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      const errorCode = firstError.msg;
      const errorMessage =
        errorMessagesUser[errorCode] || "Invalid login request.";

      return sendErrorResponse(res, errorMessage, errorCode);
    }
    next();
  },
];

module.exports = validateLogin;
