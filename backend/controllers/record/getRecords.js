const authenticateToken = require("../../utils/authenticateToken");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const Record = require("../../models/record.model");

exports.getRecords = [
  authenticateToken,
  async (req, res) => {
    try {
      const records = await Record.find({ userId: req.user.id }).sort({
        created_at: -1,
      });
      return res.status(200).json({
        error: false,
        records,
        message: "Get records successfully.",
      });
    } catch (err) {
      return sendErrorResponse(
        res,
        "Unexpected error at getting records.",
        "UNEXPECTED_ERROR"
      );
    }
  },
];
