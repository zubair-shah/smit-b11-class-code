const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  let { name, email, password } = req.body;
  console.log("name", name, email, password);
  if (name === undefined || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name,Email and Password is required" });
  }
  const checkUser = await User.findOne({ email });

  if (checkUser !== null) {
    return res.status(400).json({ message: "User Already Exist!" });
  }
  console.log("checkUser", checkUser);

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword", hashPassword);
    const user = await User.create({ name, email, password: hashPassword });
    const token = jwt.sign({ id: user._id }, "zubairjwtsecretkey");
    console.log("token", token);
    console.log("user", user);
    res.status(200).json({ message: "User Created successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  // const newTodo = await Todo.create({ title, completed });
};
const loginUser = async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password is required" });
  }

  try {
    // console.log("hashPassword", hashPassword);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    console.log("user", user);
    const comparePassword = await bcrypt.compare(password, user.password);
    console.log("comparePassword", comparePassword);
    if (comparePassword === false) {
      return res.status(404).json({ message: "Invalid Email Or Password" });
    }

    const token = jwt.sign({ id: user._id }, "zubairjwtsecretkey");
    console.log("token", token);
    console.log("user", user);
    res.status(200).json({ message: "Login successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  // const newTodo = await Todo.create({ title, completed });
};
const loginAdmin = async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password is required" });
  }

  try {
    // console.log("hashPassword", hashPassword);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (user.role !== "admin") {
      return res
        .status(404)
        .json({ message: "Access Denied. Admin Previlages required" });
    }
    console.log("user", user);
    const comparePassword = await bcrypt.compare(password, user.password);
    console.log("comparePassword", comparePassword);
    if (comparePassword === false) {
      return res.status(404).json({ message: "Invalid Email Or Password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "zubairjwtsecretkey",
      { expiresIn: "7d" }
    );

    console.log("token", token);
    console.log("user", user);
    res.status(200).json({ message: "Login successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  // const newTodo = await Todo.create({ title, completed });
};

module.exports = {
  createUser,
  loginUser,
  loginAdmin,
};
