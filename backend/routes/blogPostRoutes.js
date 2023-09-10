import express from "express";
import {
  createBlogPost,
  getPendingBlogPosts,
  acceptBlogPost,
  deleteBlogPost,
  getAcceptedBlogPosts,
} from "../controllers/blogPostController.js";
const router = express.Router();

// API route for submitting a blog post
router.post("/", createBlogPost);
router.get("/accepted", getAcceptedBlogPosts);

// API route for deleting a blog post
router.delete("/:id", deleteBlogPost);

// admin only
router.get("/pending", getPendingBlogPosts);
router.patch("/:id/accept", acceptBlogPost);

export default router;
