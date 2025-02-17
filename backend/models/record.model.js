const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Record", required: false },
    type: { type: String, enum: ["income", "outcome"], required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, enum: ["TL", "USD", "EUR"], required: true },
    status: { type: Boolean, required: true },
    dueDate: { type: Number, required: false },
    transactionDate: { type: Number, required: false },
    installment: { type: Boolean, required: true },
    installmentCount: {
      type: Number,
      required: function () {
        return this.installment === true;
      },
      default: 0,
    },
    count: { type: Number, required: true, default: 1 },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: false }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Record", recordSchema);
