const Record = require("../../models/record.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const mongoose = require("mongoose");

exports.addRecord = async (req, res) => {
  let userObjectId = new mongoose.Types.ObjectId(req.body.userId);
  try {
    const record = new Record({
      userId: userObjectId,
      ...req.body,
    });
    await record.save();
    return res.status(201).json({
      error: false,
      record,
      message: "The record successfully added.",
    });
  } catch (err) {
    console.error("MongoDB Save Error:", err); // Hata mesajını görmek için
    return sendErrorResponse(
      res,
      "Unexpected error at saving record.",
      "UNEXPECTED_ERROR"
    );
  }
};
