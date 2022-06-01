const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,

  },
  mobile: {
    type: Number,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  otp: {
    type: String,
    // required: true,
  },
  isVerified: {
    type: Boolean,
    // default: false,
  },
});
module.exports = mongoose.model("users", userSchema);
