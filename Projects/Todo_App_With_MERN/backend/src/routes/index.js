const express = require("express");
const router = express.Router();

const TodoRoutes = require("./TodoRoute");
const AuthRoutes = require("./AuthRoute");

router.use("/auth", AuthRoutes);
router.use("/todo", TodoRoutes);

module.exports = router;
