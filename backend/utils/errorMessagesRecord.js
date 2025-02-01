const errorMessagesRecord = {
  MISSING_USER_ID: "User ID cannot be empty.",
  INVALID_USER_ID: "Invalid User ID format.",

  INVALID_PARENT_ID: "Invalid Parent ID format.",

  MISSING_TYPE: "Type cannot be empty.",
  INVALID_TYPE: "Type must be either 'income' or 'outcome'.",

  MISSING_TITLE: "Title cannot be empty.",

  MISSING_AMOUNT: "Amount cannot be empty.",
  INVALID_AMOUNT: "Amount must be a numeric value.",

  MISSING_CURRENCY: "Currency cannot be empty.",
  INVALID_CURRENCY: "Currency must be 'TL', 'USD', or 'EUR'.",

  MISSING_STATUS: "Status cannot be empty.",
  INVALID_STATUS: "Status must be a boolean value.",

  INVALID_DUE_DATE: "Due date must be a valid date format (ISO8601).",

  INVALID_TRANSACTION_DATE:
    "Transaction date must be a valid date format (ISO8601).",

  MISSING_INSTALLMENT: "Installment status cannot be empty.",
  INVALID_INSTALLMENT: "Installment must be a boolean value.",

  MISSING_INSTALLMENT_COUNT:
    "Installment count cannot be empty if installment is true.",
  INVALID_INSTALLMENT_COUNT: "Installment count must be a numeric value.",

  MISSING_COUNT: "Count cannot be empty.",
  INVALID_COUNT: "Count must be a numeric value.",

  INVALID_TAGS: "Tags must be an array.",
  INVALID_TAG_ID: "Each tag must be a valid MongoDB ObjectId.",
};

module.exports = errorMessagesRecord;
