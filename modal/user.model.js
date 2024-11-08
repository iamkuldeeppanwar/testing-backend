const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified) next();
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

userSchema.methods.getJwtToken = async function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET);
};

const User = mongoose.model("User", userSchema);
