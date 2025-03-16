const express = require('express');
const mongoose = require('mongoose')
const app = express()
const port = 3001


app.use(express.urlencoded({ extended: true }))

// parse json
app.use(express.json())
//your database user and password 
mongoose.connect('mongodb+srv://zubairsaylani:hGo9Cx1NLMvsamrT@cluster0.9yt3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todo')
    .then(() => console.log("Connection with mongodb is successful"))
    .catch((err) => console.log('err', err))

const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
})

const Todo = mongoose.model("Todo", todoSchema)

let todo = [];

app.get('/', (req, res) => {
    res.status(200).send('Hello World! Server is Running')
})

app.get('/getAllTodo', async (req, res) => {
    const todos = await Todo.find()
    // res.status(200).json(todo)
    res.status(200).json(todos)
})


app.post('/createTodo', async (req, res) => {
    console.log('req', req.body)
    let { title, completed } = req.body;
    if (!title && !completed) {
        res.status(400).json({ message: "Title and Completed is Required" })
    }
    console.log(title, completed)
    const newTodo = new Todo({ title, completed })
    await newTodo.save()
    // todo.push({ title, completed })
    res.status(200).json({ message: "todo added successfully" })
})

app.listen(port, () => {
    console.log(`server is listening on port: ${port}`)
})