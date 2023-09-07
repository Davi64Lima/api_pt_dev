const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

module.exports = User;
