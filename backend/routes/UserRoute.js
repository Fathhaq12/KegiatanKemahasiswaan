import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginHandler,
  logout,
  getProfile,
} from "../controller/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// User CRUD (admin only, harus login)
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/create-users", createUser); // register boleh tanpa login
router.put("/update-users/:id", verifyToken, updateUser);
router.delete("/delete-users/:id", verifyToken, deleteUser);

// Auth & profile
router.post("/login", loginHandler);
router.post("/logout", logout);
router.get("/profile", verifyToken, getProfile);

export default router;
