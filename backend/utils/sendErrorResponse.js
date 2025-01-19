const sendErrorResponse = (
  res,
  message = "",
  errorCode = "",
  isUnexpected = false
) => {
  if (isUnexpected) {
    return res.status(500).json({
      error: true,
      errorCode: "UNEXPECTED_ERROR",
      message: "Internal Server Error",
    });
  } else {
    return res.status(400).json({
      error: true,
      errorCode: errorCode,
      message: message,
    });
  }
};

module.exports = sendErrorResponse;
