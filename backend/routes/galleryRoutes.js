import express from "express";
import {
  uploadMedia,
  getGallery,
  disableMedia,
} from "../controllers/galleryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { permitRoles, adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* -------------------------------------------------
   1️⃣ PUBLIC — View gallery
------------------------------------------------- */
router.get("/", getGallery);

/* -------------------------------------------------
   2️⃣ COMMITTEE / ADMIN — Upload media
------------------------------------------------- */
router.post(
  "/upload",
  authMiddleware,
  permitRoles("committee", "admin"),
  upload.single("file"),
  uploadMedia
);

/* -------------------------------------------------
   3️⃣ ADMIN ONLY — Disable media
------------------------------------------------- */
router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  disableMedia
);

export default router;
