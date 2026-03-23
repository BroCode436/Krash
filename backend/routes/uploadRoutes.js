const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Post = require("../models/Post");

const storage = multer.memoryStorage();
const upload = multer({ storage });


// 🔴 POST — upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) return res.status(500).json(error);

        const post = await Post.create({
          title: req.body.title,
          description: req.body.description,
          imageUrl: result.secure_url,
        });

        res.json(post);
      }
    );

    stream.end(req.file.buffer);

  } catch (err) {
    res.status(500).json(err);
  }
});


// 🔵 GET — fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
