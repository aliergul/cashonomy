const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["income", "outcome"], required: true },
    color: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Tag", tagSchema);
