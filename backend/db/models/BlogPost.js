import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: false },
  content: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  unlikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  loves: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  avatar: { type: String, required: false },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ]
});


const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
