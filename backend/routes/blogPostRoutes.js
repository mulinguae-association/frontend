import express from "express";
import {
  createBlogPost,
  getPendingBlogPosts,
  acceptBlogPost,
  deleteBlogPost,
  getAcceptedBlogPosts,
  searchBlogPosts,
} from "../controllers/blogPostController.js";
const router = express.Router();

// API route for submitting a blog post
router.post("/", createBlogPost);
router.get("/accepted", getAcceptedBlogPosts);

// API route for deleting a blog post
router.delete("/:id", deleteBlogPost);

// api route for search a blog post 
router.get("/search", searchBlogPosts);


// admin only
router.get("/pending", getPendingBlogPosts);
router.patch("/:id/accept", acceptBlogPost);

export default router;
