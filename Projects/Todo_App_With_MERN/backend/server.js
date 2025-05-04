const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./src/routes/index.js");
const app = express();
const port = 4001;

app.use(express.urlencoded({ extended: true }));
// parse json
app.use(express.json());

app.use(cors("*"));
mongoose
  .connect("mongodb://localhost:27017/MERN_APP")
  // .connect("mongodb+srv://zubairsaylani:hGo9Cx1NLMvsamrT@cluster0.9yt3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/MERN_APP")
  .then(() => console.log("Connection with mongodb is successful"))
  .catch((err) => console.log("err", err));

app.use(router);
app.get("/", (req, res) => {
  res.status(200).send("Hello World! Server is Running");
});

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
