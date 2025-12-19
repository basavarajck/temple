import "dotenv/config";
import express from "express";
import cors from "cors";

// Database connection
import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
// More routes will be added later:
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import activityLogRoutes from "./routes/activityLogRoutes.js";

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("Temple Backend Running Successfully âœ”ï¸ (ESM Enabled)");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);


// Income, expense, admin routes will be added step-by-step
// app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/activity-logs", activityLogRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

