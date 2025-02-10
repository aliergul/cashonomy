const authenticateToken = require("../../utils/authenticateToken");
const Record = require("../../models/record.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const mongoose = require("mongoose");

exports.deleteRecord = [
  authenticateToken,
  async (req, res) => {
    const objectRecordId = new mongoose.Types.ObjectId(req.params.recordId);
    const objectUserId = new mongoose.Types.ObjectId(req.user.id);

    try {
      const record = await Record.findOne({
        _id: objectRecordId,
        userId: objectUserId,
      });

      if (!record) {
        return sendErrorResponse(
          res,
          "Record did not found",
          "RECORD_NOT_FOUND"
        );
      }
      await Record.deleteOne({
        _id: objectRecordId,
        userId: objectUserId,
      });

      return res.status(200).json({
        error: false,
        message: "Record deleted successfully.",
      });
    } catch (err) {
      return sendErrorResponse(
        res,
        "Unexpected error at deleting records.",
        "UNEXPECTED_ERROR"
      );
    }
  },
];
