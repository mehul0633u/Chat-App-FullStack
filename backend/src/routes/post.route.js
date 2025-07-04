import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createPost);       // POST /api/posts
router.get("/", protectRoute, getAllPosts);       // GET  /api/posts

export default router;
