const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const createUser = async (req, res) => {
  let { name, email, password } = req.body;
  if (!name && !email && !password) {
    res.status(400).json({ message: "Name,Email and Password is required" });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword", hashPassword);
    const user = await User.create({ name, email, password: hashPassword });
    console.log("user", user);
    res.status(200).json({ message: "User Created successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  // const newTodo = await Todo.create({ title, completed });
};

module.exports = {
  createUser,
};
