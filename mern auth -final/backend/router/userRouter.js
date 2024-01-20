// userRouter.js
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js"; // Adjust the path based on your project structure
import verifyToken from "../middleWare/verifyToken.js"; // Adjust the path based on your project structure


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update", verifyToken, updateUserProfile);
router.delete("/delete", verifyToken, deleteUser);

export default router;
