// Import your modules here
import BlogPost from "../db/models/BlogPost.js";
import Comment from "../db/models/Comment.js";

// Define your functions
async function createComment(req, res) {
  try {
    const { content, id, parentCommentId } = req.body;
    console.log(content, id);
    const parentComment = await Comment.findById(parentCommentId);
    // Find the blog post with the provided ID
    const blogPost = await BlogPost.findById(id);
    const blogId = id;
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const comment = new Comment({
      content,
      blogId,
      parentComment: parentCommentId,
    });

    await comment.save();
    if (parentComment) {
      parentComment.replies.push(comment);
      await parentComment.save();
    }
    // Sort the comments array in descending order based on createdAt timestamps
    blogPost.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

async function getPendingComments(req, res) {
  try {
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
  console.log(authorId);
  try {
    const comment = await Comment.findById(id);
    console.log(comment);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.authorId == req.userId.toString()) {
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
  deleteComment,
  getPendingComments,
  acceptComment,
};
