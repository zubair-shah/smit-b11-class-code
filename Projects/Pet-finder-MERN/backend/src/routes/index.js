const express = require("express");
const router = express.Router();

const AuthRoutes = require("./AuthRoute");
const AdminRoute = require("./AdminRoute");

router.use("/api/auth", AuthRoutes);
router.use("/api/admin", AdminRoute);

module.exports = router;
