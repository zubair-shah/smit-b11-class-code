const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTodo,
  getAllTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/TodoController");

router.post("/create-todo", protect, createTodo);
router.get("/get-allTodo", protect, getAllTodo);
router.delete("/delete-todo:id", protect, deleteTodo);
router.put("/update-todo:id", protect, updateTodo);
router.patch("/toggle-todo:id", protect, updateTodo);

module.exports = router;
