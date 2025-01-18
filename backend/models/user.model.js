const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: 15,
      minLength: 3,
    },
    email: { type: String, required: true, trim: true, unique: true },
    encrypted_password: {
      type: String,
      required: true,
    },
    salt: String,
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
    return this.securedPassword(plainPassword) === this.encrypted_password;
  },

  securedPassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return require("crypto")
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      console.error(err);
      return "Error in hashing the password";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
