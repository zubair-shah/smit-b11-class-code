const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const PetfinderUser = mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);

module.exports = {User};