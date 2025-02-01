const { body, validationResult } = require("express-validator");
const errorMessagesRecord = require("../utils/errorMessagesRecord");
const sendErrorResponse = require("../utils/sendErrorResponse");

const validateRecord = [
  body("userId")
    .notEmpty()
    .withMessage("MISSING_USER_ID")
    .isMongoId()
    .withMessage("INVALID_USER_ID"),
  body("parentId").optional().isMongoId().withMessage("INVALID_PARENT_ID"),
  body("type")
    .notEmpty()
    .withMessage("MISSING_TYPE")
    .isIn(["income", "outcome"])
    .withMessage("INVALID_TYPE"),
  body("title").notEmpty().withMessage("MISSING_TITLE"),
  body("amount")
    .notEmpty()
    .withMessage("MISSING_AMOUNT")
    .isNumeric()
    .withMessage("INVALID_AMOUNT"),
  body("currency")
    .notEmpty()
    .withMessage("MISSING_CURRENCY")
    .isIn(["TL", "USD", "EUR"])
    .withMessage("INVALID_CURRENCY"),
  body("status")
    .notEmpty()
    .withMessage("MISSING_STATUS")
    .isBoolean()
    .withMessage("INVALID_STATUS"),
  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("INVALID_DUE_DATE"),
  body("transactionDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("INVALID_TRANSACTION_DATE"),
  body("installment")
    .notEmpty()
    .withMessage("MISSING_INSTALLMENT")
    .toBoolean()
    .isBoolean()
    .withMessage("INVALID_INSTALLMENT"),
  body("installmentCount")
    .if(body("installment").equals("true"))
    .isNumeric()
    .withMessage("INVALID_INSTALLMENT_COUNT"),
  body("count")
    .notEmpty()
    .withMessage("MISSING_COUNT")
    .isNumeric()
    .withMessage("INVALID_COUNT"),
  body("tags").optional().isArray().withMessage("INVALID_TAGS"),
  body("tags.*").isMongoId().withMessage("INVALID_TAG_ID"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      const errorCode = firstError.msg;
      const errorMessage = errorMessagesRecord[errorCode] || "Invalid request.";

      return sendErrorResponse(res, errorMessage, errorCode);
    }
    next();
  },
];

module.exports = validateRecord;
