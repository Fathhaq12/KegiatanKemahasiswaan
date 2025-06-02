import express from "express";
import {
  createKegiatan,
  getKegiatan,
  updateStatus,
  updateKegiatan,
  deleteKegiatan,
} from "../controller/KegiatanController.js";
import { verifyToken, isAdmin } from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/kegiatan", verifyToken, createKegiatan);
// Untuk admin: harus pakai verifyToken agar req.role terisi
router.get("/kegiatan", getKegiatan);
router.get("/kegiatan-admin", verifyToken, getKegiatan);
router.get("/kegiatan/:id", verifyToken, getKegiatan); // Untuk user ambil kegiatan sendiri
router.patch("/kegiatan/:id/status", verifyToken, isAdmin, updateStatus);
router.put("/kegiatan/:id", verifyToken, updateKegiatan);
router.delete("/kegiatan/:id", verifyToken, deleteKegiatan);

export default router;
