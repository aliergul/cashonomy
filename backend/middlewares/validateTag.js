const { body, validationResult } = require("express-validator");
const errorMessagesTag = require("../utils/errorMessagesTag");
const sendErrorResponse = require("../utils/sendErrorResponse");

const validateTag = [
  body("userId")
    .notEmpty()
    .withMessage("MISSING_USER_ID")
    .isMongoId()
    .withMessage("INVALID_USER_ID"),

  body("type")
    .optional()
    .isIn(["income", "outcome"])
    .withMessage("INVALID_TYPE"),

  body("title")
    .notEmpty()
    .withMessage("MISSING_TITLE")
    .bail()
    .isString()
    .withMessage("INVALID_TITLE"),

  body("color")
    .notEmpty()
    .withMessage("MISSING_COLOR")
    .bail()
    .isString()
    .withMessage("INVALID_COLOR"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      const errorCode = firstError.msg;
      const errorMessage = errorMessagesTag[errorCode] || "Invalid request.";

      return sendErrorResponse(res, errorMessage, errorCode);
    }
    next();
  },
];

module.exports = validateTag;
