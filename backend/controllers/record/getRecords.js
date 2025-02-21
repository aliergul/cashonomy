const authenticateToken = require("../../utils/authenticateToken");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const Record = require("../../models/record.model");

exports.getRecords = [
  authenticateToken,
  async (req, res) => {
    const query = req.query;

    try {
      const filterConditions = { userId: req.user.id };

      if (query.type) {
        filterConditions.type = { $regex: new RegExp(query.type, "i") };
      }

      const records = await Record.find(filterConditions).sort({
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
