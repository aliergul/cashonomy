const authenticateToken = require("../../utils/authenticateToken");
const Tag = require("../../models/tag.model");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const mongoose = require("mongoose");

exports.deleteTag = [
  authenticateToken,
  async (req, res) => {
    const objectTagId = new mongoose.Types.ObjectId(req.params.tagId);
    const objectUserId = new mongoose.Types.ObjectId(req.user.id);

    try {
      const tag = await Tag.findOne({
        _id: objectTagId,
        userId: objectUserId,
      });

      if (!tag) {
        return sendErrorResponse(res, "Tag did not found", "TAG_NOT_FOUND");
      }
      await Tag.deleteOne({
        _id: objectTagId,
        userId: objectUserId,
      });

      return res.status(200).json({
        error: false,
        message: "Tag deleted successfully.",
      });
    } catch (err) {
      return sendErrorResponse(
        res,
        "Unexpected error at deleting tag.",
        "UNEXPECTED_ERROR"
      );
    }
  },
];
