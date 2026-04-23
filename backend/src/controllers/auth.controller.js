import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendWelcomeEmail } from "../emails/emailHanlders.js";

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
      try {
        // Non-blocking email step: account creation should still succeed
        // even when email credentials are missing or email provider fails.
        sendWelcomeEmail({
          to: "shahzeb.jadoon@acrosoft.io",
          name: newUser.fullName,
        }).catch((error) => {
          console.error("Failed to send welcome email:", error.message);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error(error, "Error in signup controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: " All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    generateToken(user._id, res);
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.error(error, "Error in signin controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signout = async (req, res) => {
  res.clearCookie("token");
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};
