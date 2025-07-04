import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    let imageUrl = null;

    if (image) {
      const upload = await cloudinary.uploader.upload(image);
      imageUrl = upload.secure_url;
    }

    const newPost = new Post({
      userId: req.user._id,
      content,
      image: imageUrl,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in createPost:", error.message);
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "fullName profilePic")
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getAllPosts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
