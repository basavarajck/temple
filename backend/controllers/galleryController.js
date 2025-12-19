import Gallery from "../models/Gallery.js";
import { logActivity } from "../utils/activityLogger.js";

/* -------------------------------------------------
   1️⃣ UPLOAD MEDIA (Committee/Admin)
------------------------------------------------- */
export const uploadMedia = async (req, res) => {
  try {
    const { title, description, event, mediaType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Media file is required" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const media = await Gallery.create({
      title,
      description,
      mediaType: mediaType || "image",
      fileUrl: req.file.path,
      event: event || null,
      uploadedBy: req.user.id,
    });
     // ✅ ACTIVITY LOG — Upload Media
await logActivity(
  "UPLOAD_MEDIA",
  "Gallery",
  media._id,
  req.user.id,
  {
    title: media.title,
    mediaType: media.mediaType,
  }
);

     
    return res.json({
      message: "Media uploaded successfully",
      media,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/* -------------------------------------------------
   2️⃣ GET GALLERY (Public)
------------------------------------------------- */
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ isActive: true })
      .populate("uploadedBy", "name role")
      .populate("event", "title startDate endDate")
      .sort({ createdAt: -1 });

    return res.json(gallery);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------
   3️⃣ DISABLE MEDIA (Admin Only)
------------------------------------------------- */
export const disableMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Gallery.findById(id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    media.isActive = false;
    await media.save();
    // ✅ ACTIVITY LOG — Disable Media
await logActivity(
  "DISABLE_MEDIA",
  "Gallery",
  media._id,
  req.user.id,
  { title: media.title }
);


    return res.json({
      message: "Media disabled successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
