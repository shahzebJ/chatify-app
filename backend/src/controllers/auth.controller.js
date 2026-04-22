import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// Auth Controller: Handles user registration and authentication.
// Uses JWT for session management and bcrypt for password hashing.
// Controllers import:
//   - generateToken: creates JWT in cookies
//   - User: Mongoose user model
//   - bcrypt: password hashing

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: " All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    // generate JWT token
    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error(error, "Error in signup controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  return res.status(500).json({ message: "Not implemented" });
};

export const signout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
