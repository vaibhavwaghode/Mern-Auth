const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "swer&*&^#*&^@HJHjsdhfksdfhskfhw9853734598374";


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ status: false, message: "Email already registered" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    return res
      .status(201)
      .json({ status: true, message: "Registration successful" });
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


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
      expiresIn: "1hr",
    });

    return res
      .status(200)
      .json({ status: true, message: "Login successful", token: token });
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


exports.getProfile = async (req, res) => {
  try {
    const user = req.user;  middleware
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    return res
      .status(200)
      .json({ status: true, message: "Profile Data", data: userData });
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
