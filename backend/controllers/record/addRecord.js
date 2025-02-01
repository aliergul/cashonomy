const Record = require("../../models/record.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");

exports.addRecord = async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    return res.status(201).json({
      error: false,
      record,
      message: "The record successfully added.",
    });
  } catch (err) {
    return sendErrorResponse(
      res,
      "Unexpected error at saving record.",
      "UNEXPECTED_ERROR",
      true
    );
  }
};
