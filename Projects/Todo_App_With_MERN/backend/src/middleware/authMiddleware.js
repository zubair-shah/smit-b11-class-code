const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "Unauthorized" });
  }
  try {
    const decoded = await jwt.verify(token, "zubairjwtsecretkey");
    req.userId = decoded.id;
    console.log("decoded", decoded);
    next();
  } catch (error) {
    console.log("err", error);
    return res.status(404).json({ message: "Invalid Token" });
  }
  console.log("token", token);
  //   next()
};

module.exports = {
  protect,
};
