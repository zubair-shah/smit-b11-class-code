const express = require("express");
const router = express.Router()
const {createTodo,getAllTodo,deleteTodo,updateTodo} = require('../controllers/TodoController')

router.post('/create-todo',createTodo)
router.get('/get-allTodo',getAllTodo)
router.delete('/delete-todo:id',deleteTodo)
router.put('/update-todo:id',updateTodo)
router.patch('/toggle-todo:id', updateTodo)


  module.exports = router;