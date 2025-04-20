const Todo = require("../models/TodoSchema");

const createTodo = async (req, res) => {
  let { title, completed } = req.body;
  if (!title && !completed) {
    res.status(400).json({ message: "Title and Completed is Required" });
  }
  console.log(title, completed);
  const newTodo = await Todo.create({ title, completed });

  res.status(200).json({ message: "todo added successfully", data: newTodo });
};
const getAllTodo = async (req, res) => {
  const todos = await Todo.find();
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
