import { ENV } from "../src/lib/env.js";
import jwt from "jsonwebtoken";
import User from "../src/models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized : No token provided" });
    }
    const decodedToken = jwt.verify(token, ENV.jwtSecret);
    if (!decodedToken)
      return res.status(401).json({ message: "Invalid Token" });

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error, "Error in auth middleware");
    res.status(500).json({ message: "Internal server error" });
  }
};
