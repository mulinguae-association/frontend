import express from "express";
import {
  createComment, // Added: Import createComment function
  deleteComment, // Added: Import deleteComment function
  getPendingComments,
  acceptComment,
  // commentReplies
} from "../controllers/commentController.js";
const router = express.Router();

// API route for adding a comment to a blog post
router.post("/:id", createComment);

// API route for deleting a comment from a blog post
router.delete("/:id", deleteComment);

//admin
router.get("/pending", getPendingComments);
router.patch("/accept/:id", acceptComment);
router.get("/accept/:id", acceptComment);
// router.post("/:parentCommentId/replies", commentReplies);
// router.get("/", getComments);

export default router;
