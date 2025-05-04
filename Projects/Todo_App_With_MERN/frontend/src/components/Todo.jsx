// src/TodoApp.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Paper,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "http://localhost:4001";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(`${API_URL}/todo/get-allTodo`);
    console.log('res',res)
    setTodos(res.data.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    const res = await axios.post(`${API_URL}/todo/create-todo`, { title, completed: false });
    console.log('res',res)
    setTitle("");
    setTimeout(() => {
      window.location.reload();
    }, 100);
    // setTodos([...todos, res.data]);
  };

  const toggleTodo = async (id, completed) => {
    const res = await axios.patch(`${API_URL}/todo/toggle-todo${id}`, { completed: !completed });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    setTitle("");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const deleteTodo = async (id) => {
    let deletedTodo = await axios.delete(`${API_URL}/todo/delete-todo${id}`);
    console.log("deletedTodo", deletedTodo)
    if(deletedTodo.data.status == true){
      setTodos(todos.filter(todo => todo._id !== id));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
console.log('')
  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          📝 MERN Todo App
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            label="New Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={addTodo}>
            Add
          </Button>
        </Box>

        <Paper elevation={3}>
          <List>
            {todos.map((todo) => {
                return (
                    <ListItem
                        key={todo._id}
                        secondaryAction={<IconButton edge="end" onClick={() => deleteTodo(todo._id)}>
                            {/* <DeleteIcon /> */}
                            delete
                        </IconButton>}
                    >
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo._id, todo.completed)} />
                        <ListItemText
                            primary={todo.title}
                            style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                                color: todo.completed ? "#999" : "inherit",
                            }} />
                    </ListItem>
                );
            })}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Todo;