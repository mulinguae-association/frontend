import mongoose from "mongoose";
// import moment from "moment";

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: false },
  content: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ]
});


const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
