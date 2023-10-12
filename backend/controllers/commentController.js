// Import your modules here
import BlogPost from "../db/models/BlogPost.js";
import Comment from "../db/models/Comment.js";
import User from "../db/models/User.js";

// Define your functions
async function createComment(req, res) {
  try {
    const { content, id } = req.body;
    const authorId = req.userId;
    const authorName = req.userName;
    // find author info
    const author = await User.findById(authorId)

    // Find the blog post with the provided ID
    const blogPost = await BlogPost.findById(id);
    const blogId = id;
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const comment = new Comment({
      content,
      blogId,
      authorId,
      authorName,
      postedBy: author,
      status: req.role === "admin" ? "accepted" : "pending"
    });

    await comment.save();
    // Add the new comment to the comments array
    blogPost.comments.push(comment);

    // Save the updated blog post
    await blogPost.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: comment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
async function updatedComment(req, res) {
  const { id } = req.params
  const { content } = req.body;
  try {
    // Find the blog post with the provided ID
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" })
    }
    if (comment.postedBy._id.toString() === req.userId.toString() || req.role === "admin") {
      // Update the comment content
      comment.content = content;
      comment.status = req.role === "admin" ? "accepted" : "pending";

      // Save the updated comment
      await comment.save();

      res.status(201).json({ message: "Comment updated successfully" });
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

// Create a reply comment and push it into the parent comment's replies array
async function createReplyComment(req, res) {
  const { content, blogId, parentCommentId } = req.body;
  const authorId = req.userId;
  const authorName = req.userName;
  try {
    const parentComment = await Comment.findById(parentCommentId);
    // find author info
    const author = await User.findById(authorId)
    if (!parentComment) {
      return res.status(404).json({ error: "Parent comment not found" });
    }

    const comment = new Comment({
      content,
      blogId,
      parentComment: parentCommentId,
      authorId,
      authorName,
      postedBy: author,
      status: req.role === "admin" ? "accepted" : "pending"
    });

    await comment.save();

    // Push the reply comment into the parent comment's replies array
    parentComment.replies.push(comment);
    await parentComment.save();

    res.status(201).json({
      message: "Reply added successfully",
      comment: comment,
    });
  } catch (error) {
    console.error("Error adding reply comment:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function getPendingComments(req, res) {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ error: "No permission." });
    }
    const pendingComments = await Comment.find({ status: "pending" }).populate({
      path: 'replies',
      model: 'Comment',
    });
    res.status(200).json(pendingComments);
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function acceptComment(req, res) {
  try {
    const { id } = req.params;

    // Perform the logic to update the status of the blog post with the provided ID to "accepted"
    // For example:
    const comment = await Comment.findById(id);
    comment.status = "accepted";
    await comment.save();

    res.status(200).json({ message: "Blog post accepted successfully" });
  } catch (error) {
    console.error("Error accepting blog post:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

async function deleteComment(req, res) {
  const { id } = req.params;
  const authorId = req.userId;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.postedBy._id.toString() === authorId.toString() || req.role === "admin") {
      // Remove the comment from the comments array
      await Comment.findByIdAndDelete(id);
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(401).json({ error: "error deleting another user" });
      console.log("error deleting another user");
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

// Export your functions
export {
  createComment,
  createReplyComment,
  updatedComment,
  deleteComment,
  getPendingComments,
  acceptComment,
};
