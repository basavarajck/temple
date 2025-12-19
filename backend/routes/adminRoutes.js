import express from "express";
import { 
  getPendingExpenses, 
  approveExpense,
  lockMonth
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/pending-expenses", authMiddleware, adminOnly, getPendingExpenses);

router.post("/approve/:id", authMiddleware, adminOnly, approveExpense);

router.post("/lock-month", authMiddleware, adminOnly, lockMonth);

export default router;
