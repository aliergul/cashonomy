const authenticateToken = require("../../utils/authenticateToken");
const Record = require("../../models/record.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const mongoose = require("mongoose");

exports.editRecord = [
  authenticateToken,
  async (req, res) => {
    const objectRecordId = new mongoose.Types.ObjectId(req.params.recordId);
    const objectUserId = new mongoose.Types.ObjectId(req.user.id);

    try {
      const record = await Record.findOneAndUpdate(
        { _id: objectRecordId, userId: objectUserId },
        req.body,
        { new: true }
      );

      if (!record) {
        return sendErrorResponse(
          res,
          "Record did not found",
          "RECORD_NOT_FOUND"
        );
      }

      return res.status(200).json({
        error: false,
        record,
        message: "The record successfully edited.",
      });
    } catch (err) {
      return sendErrorResponse(
        res,
        "Unexpected error at editing records.",
        "UNEXPECTED_ERROR"
      );
    }
  },
];
