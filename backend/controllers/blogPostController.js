import BlogPost from "../db/models/BlogPost.js";

export async function createBlogPost(req, res) {
  try {
    const { title, subTitle, content } = req.body;
    const blogPost = new BlogPost({ title, subTitle, content });
    await blogPost.save();

    res.json(blogPost.toObject());
  } catch (error) {
    console.error("Error submitting blog post:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function getPendingBlogPosts(req, res) {
  try {
    const pendingPosts = await BlogPost.find({ status: "pending" });
    res.status(200).json(pendingPosts.map((post) => post.toObject()));
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function acceptBlogPost(req, res) {
  try {
    const { id } = req.params;
    await BlogPost.findByIdAndUpdate(id, { status: "accepted" });
    return res.status(200).json({ message: "Blog post accepted successfully" });
  } catch (error) {
    console.error("Error accepting blog post:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
}

export async function deleteBlogPost(req, res) {
  try {
    const { id } = req.params;
    await BlogPost.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
}

export async function getAcceptedBlogPosts(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const acceptedPosts = await BlogPost.find({ status: "accepted" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate({
        path: "comments",
        model: "Comment",
        match: { status: "accepted" },
        options: { sort: { createdAt: -1 } },
        populate: [
          {
            path: "replies",
            model: "Comment",
            match: { status: "accepted" },
            options: { sort: { createdAt: -1 } }
          },
        ],
      })
      .exec();

    res.status(200).json(acceptedPosts);
  } catch (error) {
    console.error("Error retrieving accepted blog posts:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function searchBlogPosts(req, res) {
  const searchQuery = req.query.q;
  try {
    const searchRegex = new RegExp(searchQuery, "i"); // Case-insensitive search
    const searchResults = await BlogPost.find({
      status: "accepted",
      $or: [
        { title: { $regex: searchRegex } },
        { userName: { $regex: searchRegex } },
      ],
    }).sort({ createdAt: -1 }).populate({
      path: "comments",
      model: "BlogPost",
    }).populate({
      path: "comments",
      model: "Comment",
      match: { status: "accepted" },
      options: { sort: { createdAt: -1 } },
      populate: [
        {
          path: "replies",
          model: "Comment",
          match: { status: "accepted" },
          options: { sort: { createdAt: -1 } }
        },
      ],
    }).exec();

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching blog posts:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
