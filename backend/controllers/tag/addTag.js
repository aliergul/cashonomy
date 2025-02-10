const Tag = require("../../models/tag.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const mongoose = require("mongoose");

exports.addTag = async (req, res) => {
  let userObjectId = new mongoose.Types.ObjectId(req.body.userId);

  try {
    const existingTag = await Tag.findOne({
      userId: userObjectId,
      title: req.body.title,
    });

    if (existingTag) {
      return sendErrorResponse(
        res,
        "Tag with this title already exists.",
        "DUPLICATE_TAG"
      );
    }

    const tag = new Tag({
      userId: userObjectId,
      ...req.body,
    });

    await tag.save();

    return res.status(201).json({
      error: false,
      tag,
      message: "The tag successfully added.",
    });
  } catch (err) {
    return sendErrorResponse(
      res,
      "Unexpected error at saving tag.",
      "UNEXPECTED_ERROR"
    );
  }
};
