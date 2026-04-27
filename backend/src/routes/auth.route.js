import { Router } from "express";
import {
  signup,
  signin,
  signout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

router.post("/update-profile", authMiddleware, updateProfile);
router.get("/check", authMiddleware, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
