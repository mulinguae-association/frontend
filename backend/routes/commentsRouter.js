import express from "express";
import {
  createComment, // Added: Import createComment function
  deleteComment, // Added: Import deleteComment function
  getPendingComments,
  acceptComment,
  createReplyComment,
  updatedComment,
} from "../controllers/commentController.js";
const router = express.Router();

// API route for adding a comment to a blog post
router.post("/:id", createComment);
router.post("/reply/:id", createReplyComment);

router.patch("/update/:id", updatedComment);

// API route for deleting a comment from a blog post
router.delete("/:id", deleteComment);

//admin
router.get("/pending", getPendingComments);
router.patch("/accept/:id", acceptComment);
router.get("/accept/:id", acceptComment);

export default router;
