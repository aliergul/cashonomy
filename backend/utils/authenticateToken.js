const jwt = require("jsonwebtoken");
const sendErrorResponse = require("../utils/sendErrorResponse");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return sendErrorResponse(res, "Unauthorized", "UNAUTHORIZED");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return sendErrorResponse(
        res,
        "Token verification failed",
        "INVALID_TOKEN"
      );
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
