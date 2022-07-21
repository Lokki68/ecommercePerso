const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    nickName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
