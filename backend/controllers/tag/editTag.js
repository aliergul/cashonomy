const authenticateToken = require("../../utils/authenticateToken");
const Tag = require("../../models/tag.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const mongoose = require("mongoose");

exports.editTag = [
  authenticateToken,
  async (req, res) => {
    const objectTagId = new mongoose.Types.ObjectId(req.params.tagId);
    const objectUserId = new mongoose.Types.ObjectId(req.user.id);

    try {
      const existingTag = await Tag.findOne({
        userId: objectUserId,
        title: req.body.title,
      });

      if (existingTag) {
        return sendErrorResponse(
          res,
          "Tag with this title already exists.",
          "DUPLICATE_TAG"
        );
      }

      const tag = await Tag.findOneAndUpdate(
        { _id: objectTagId, userId: objectUserId },
        req.body,
        { new: true }
      );

      if (!tag) {
        return sendErrorResponse(res, "Tag did not found", "TAG_NOT_FOUND");
      }

      return res.status(200).json({
        error: false,
        tag,
        message: "The tag successfully edited.",
      });
    } catch (err) {
      return sendErrorResponse(
        res,
        "Unexpected error at editing tag.",
        "UNEXPECTED_ERROR"
      );
    }
  },
];
