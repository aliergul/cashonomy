const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    encrypted_password: { type: String },
    salt: String,
    // authSource: {
    //   type: String,
    //   enum: ["self", "google"],
    //   default: "self",
    // },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypted_password = this.securedPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return bcrypt.compareSync(plainPassword, this.encrypted_password);
  },

  securedPassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));
    } catch (err) {
      return "Error in hashing the password";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
