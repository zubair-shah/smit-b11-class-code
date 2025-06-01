const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const router = require("./src/routes/index.js");
const app = express();
const port = 4001;

app.use(express.urlencoded({ extended: true }));
// parse json
app.use(express.json());

app.use(cors("*"));
mongoose
  .connect("mongodb://localhost:27017/PET_FINDER_MERN_APP")
  // .connect(
  //   "mongodb+srv://zubairsaylani:hGo9Cx1NLMvsamrT@cluster0.9yt3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/MERN_APP"
  // )
  .then(() => {
    console.log("Connection with mongodb is successful");
    createAdminByDefault();
  })
  .catch((err) => console.log("err", err));

app.use(router);
app.get("/", (req, res) => {
  res.status(200).send("Hello World! Server is Running");
});

async function createAdminByDefault() {
  const User = require("./src/models/UserSchema.js");
  try {
    const adminExist = await User.findOne({ role: "admin" });

    if (!adminExist) {
      const hashPassword = await bcrypt.hash("admin123", 10);
      const admin = new User({
        name: "zubair",
        email: "zubair@gmail.com",
        password: hashPassword,
        role: "admin",
      });

      await admin.save();
      console.log("admin Created Successfully");
      console.log("admin Email: zubair@gmail.com");
      console.log("admin Password: admin123");
    }
  } catch (error) {
    console.log("error", error);
  }
}

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
