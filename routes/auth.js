const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../model/user");

const errorHandler = (res, error) => {
  res.status(500).json({ error: "Internal Server Error" });
};

//SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, mobile, password } = req.body;

    if (!fullname || !email || !mobile || !password) {
      return res.status(404).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ error: "Email is already registered" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      mobile,
      password: encryptedPassword,
    });
    await user.save();
    res.json({
      status: "SUCCESS",
      data: "you have signed up successfully",
    });
  } catch (error) {
    errorHandler(res, error);
    // res.json({
    //   status: "FAILED",
    //   message: error.message,
    // });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ error: "Email and Password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }

    const PasswordMatched = await bcrypt.compare(password, user.password);
    if (PasswordMatched) {
      const jwtToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.json({
        status: "SUCCESS",
        message: "you have logged in successfully",
        jwtToken,
      });
    } else {
      res.json({
        status: "FAILED",
        message: "Incorrect email and password. Please try again",
      });
    }
  } catch (error) {
    errorHandler(res, error);
    // res.json({
    //   status: "FAILED",
    //   message: "Incorrect email and password. Please try again",
    // });
  }
});

module.exports = router;
