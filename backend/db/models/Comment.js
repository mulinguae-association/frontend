import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: String,
  authorId: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost",
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null, // Default to null for top-level comments
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
