import BlogPost from "../db/models/BlogPost.js";
import { formatRelativeDate } from "../utils/dateUtils.js";
export async function createBlogPost(req, res) {
  try {
    const { title, subTitle, content } = req.body;
    // Create a new blog post document
    const blogPost = new BlogPost({ title, subTitle, content });

    // Save the blog post to the database
    await blogPost.save();

    // Format the createdAt date to a user-friendly format
    const relativeTime = formatRelativeDate(blogPost.createdAt);
    // Send the response with the formatted date
    res.json({
      ...blogPost.toObject(),
      createdAt: relativeTime,
    });
  } catch (error) {
    console.error("Error submitting blog post:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function getPendingBlogPosts(req, res) {
  try {

    const pendingPosts = await BlogPost.find({ status: "pending" })
    //format the createdAt date for each pending post in the response
    const formattedPosts = pendingPosts.map((post) => ({
      ...post.toObject(),
      createdAt: formatRelativeDate(post.createdAt),
    }));
    // Log the retrieved data
    return res.status(200).json(formattedPosts);
  } catch (error) {
    console.error("Error retrieving blog posts:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
}

export async function acceptBlogPost(req, res) {
  try {
    const { id } = req.params;

    // Perform the logic to update the status of the blog post with the provided ID to "accepted"
    // For example:
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
    // Perform the logic to delete the blog post with the provided ID
    // For example:
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
    const acceptedPosts = await BlogPost.find({ status: "accepted" }).populate({
      path: 'comments',
      model: 'Comment',
      populate: [
        {
          path: "replies", model: "Comment"
        }
      ]
    }).exec()
    const formattedPosts = acceptedPosts.map((post) => ({
      ...post.toObject(),
      createdAt: formatRelativeDate(post.createdAt),
    }))
    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error("Error retrieving accepted blog posts:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
