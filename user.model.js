const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phoneNo: { type: String },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
});

const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;
