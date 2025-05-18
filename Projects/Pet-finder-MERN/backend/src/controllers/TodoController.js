const Todo = require("../models/TodoSchema");

const createTodo = async (req, res) => {
  let { title, completed } = req.body;
  let userId = req.userId;
  console.log("userID", userId);
  if (!title && !completed) {
    res.status(400).json({ message: "Title and Completed is Required" });
  }
  console.log(title, completed);
  const newTodo = await Todo.create({ title, completed, userId });

  res.status(200).json({ message: "todo added successfully", data: newTodo });
};
const getAllTodo = async (req, res) => {
  console.log("userId asd", req.userId);
  const todos = await Todo.find({ userId: req.userId });
  console.log("todo", todos);
  // res.status(200).json(todo)
  res.status(200).json({
    message: "data get successfully",
    data: todos,
  });
};

const deleteTodo = async (req, res) => {
  console.log(req.params.id);
  let deleteTodo = await Todo.findByIdAndDelete(req.params.id);
  console.log("deleteTodo", deleteTodo);
  res.status(200).json({ message: "todo deleted successfully", status: true });
};

const updateTodo = async (req, res) => {
  console.log(req.params.id);
  let { title, completed } = req.body;
  let updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
    title,
    completed,
  });
  res.status(200).json({ message: "todo updated successfully" });
};

module.exports = {
  createTodo,
  getAllTodo,
  deleteTodo,
  updateTodo,
};
