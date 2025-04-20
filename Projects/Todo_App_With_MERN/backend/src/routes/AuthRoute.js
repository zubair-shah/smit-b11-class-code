const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/AuthController");

router.post("/sign-up", createUser);

module.exports = router;
