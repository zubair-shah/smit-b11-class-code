const express = require("express");
const router = express.Router();

const AuthRoutes = require("./AuthRoute");
const AdminRoute = require("./AdminRoute");
const PetsRoute = require("./PetsRoute");

router.use("/api/auth", AuthRoutes);
router.use("/api/admin", AdminRoute);
router.use("/api/pets", PetsRoute);

module.exports = router;
