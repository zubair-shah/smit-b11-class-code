const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  loginAdmin,
} = require("../controllers/AuthController");

router.post("/sign-up", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);

module.exports = router;
