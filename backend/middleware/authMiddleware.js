const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secretKey = "swer&*&^#*&^@HJHjsdhfksdfhskfhw9853734598374";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token)
      return res.status(400).json({ status: false, message: "Access Denied" });

    jwt.verify(token, secretKey, async (err, decode) => {
      if (err)
        return res
          .status(400)
          .json({ status: false, message: "Invalid Token" });

      const user = await User.findById(decode?.id);
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User not found" });

      req.user = user;
      next(); 
    });
  } catch (error) {
    return res
      .status(400)
      .json({
        status: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

module.exports = authMiddleware;
