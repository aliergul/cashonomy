const authenticateToken = require("../../utils/authenticateToken");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const Tag = require("../../models/tag.model");

exports.getTags = [
  authenticateToken,
  async (req, res) => {
    try {
      const tags = await Tag.find({ userId: req.user.id }).sort({
        created_at: -1,
      });
      return res.status(200).json({
        error: false,
        tags,
        message: "Get tags successfully.",
      });
    } catch (err) {
      return sendErrorResponse(
        res,
        "Unexpected error at getting tags.",
        "UNEXPECTED_ERROR"
      );
    }
  },
];
