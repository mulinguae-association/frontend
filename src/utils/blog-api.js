import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export async function submitBlogPost(title, subTitle, content) {
  try {
    const response = await axios.post(`${baseUrl}/api/blogPosts`, {
      title,
      subTitle,
      content,
    });

    if (response.status === 200) {
      console.log("Blog post submitted successfully");
      // Reset form fields
      return true;
    } else {
      throw new Error("Error submitting blog post");
    }
  } catch (error) {
    throw new Error("Error submitting blog post: " + error.message);
  }
}

export async function fetchPendingPosts() {
  try {
    const response = await axios.get(`${baseUrl}/api/blogPosts/pending`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching pending blog posts");
    }
  } catch (error) {
    throw new Error("Error fetching pending blog posts: " + error.message);
  }
}

export async function fetchAcceptedPosts(limit) {
  try {
    const response = await axios.get(`${baseUrl}/api/blogPosts/accepted?limit=${limit}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching accepted blog posts");
    }
  } catch (error) {
    console.error("Error fetching accepted blog posts:", error);
  }
}

export async function acceptBlogPost(blogId) {
  try {
    const response = await axios.patch(`${baseUrl}/api/blogPosts/${blogId}/accept`);
    if (response.status === 200) {
      return { status: 200, data: response.data }
    } else {
      return { status: response.status, Error: "Error accepting blog post" }
    }
  }
  catch (err) {
    return { status: 500, err: "Error accepting blog post" }
  }
}

export async function removeBlogPost(blogId) {
  try {
    const response = await axios.delete(`${baseUrl}/api/blogPosts/${blogId}`);

    if (response.status === 200) {
      return { status: 200, data: response.data }
    } else {
      return { status: response.status, error: "Error deleting blog post" }
    }
  }
  catch (error) {
    return { status: 500, error: "Error deleting blog post" }
  }

}

export async function searchBlogPosts(query) {
  try {
    const response = await axios.get(`${baseUrl}/api/blogPosts/search?q=${query}`)
    if (response.status === 200) {
      return { status: 200, data: response.data };
    } else {
      console.error("Error submitting reply", response.status);
      return { status: response.status, error: "Error submitting reply" };
    }
  } catch (error) {
    console.error("Error submitting reply", error.message);
    return { status: 500, error: "Error submitting reply " + error.message };
  }
}

export async function createComment(blogId, commentData) {
  try {
    const response = await axios.post(`${baseUrl}/api/comments/${blogId}`, commentData);
    console.log("Response from createComment:", response);

    if (response.status === 201) {
      return { status: 201, data: response.data };
    } else {
      console.error("Error creating comment:", response.status);
      return { status: response.status, error: "Error creating comment" };
    }
  } catch (error) {
    console.error("Error creating comment:", error.message);
    return { status: 500, error: "Error creating comment: " + error.message };
  }
}
export async function fetchPendingComments() {
  try {
    const response = await axios.get(`${baseUrl}/api/comments/pending`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching comments blog posts");
    }
  } catch (error) {
    throw new Error("Error fetching comments blog posts: " + error.message);
  }
}

export async function acceptComment(commentId) {
  try {
    const response = await axios.patch(`${baseUrl}/api/comments/accept/${commentId}`);
    if (response.status === 200) {
      return { status: 200, data: response.data };
    } else {
      console.error("Error accepting comment", response.status);
      return { status: response.status, error: "Error accepting comment" };
    }
  } catch (error) {
    console.error("Error accepting comment", error.message);
    return { status: 500, error: "Error accepting comment " + error.message };
  }
}
export async function refuseComment(commentId) {
  try {
    const response = await axios.delete(`${baseUrl}/api/comments/${commentId}`);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    } else {
      console.error("Error refusing comment", response.status);
      return { status: response.status, error: "Error refusing comment" };
    }
  } catch (error) {
    console.error("Error refusing comment", error.message);
    return { status: 500, error: "Error refusing comment " + error.message };
  }
}

export async function handleReplySubmit(content, blogId, parentCommentId) {
  try {
    const requestBody = {
      content,
      parentCommentId,
    };

    const response = await axios.post(`${baseUrl}/api/comments/reply/${blogId}`, requestBody);
    if (response.status === 201) {
      return { status: 201, data: response.data };
    } else {
      console.error("Error submitting reply", response.status);
      return { status: response.status, error: "Error submitting reply" };
    }
  } catch (error) {
    console.error("Error submitting reply", error.message);
    return { status: 500, error: "Error submitting reply " + error.message };
  }
}

export async function updatedComment(commentId, requestedBody) {
  try {
    const response = await axios.patch(`${baseUrl}/api/comments/update/${commentId}`, requestedBody);
    if (response.status === 201) {
      return { status: 201, data: response.data };
    } else {
      console.error("Error updating comment", response.status);
      return { status: response.status, error: "Error updating comment" };
    }
  } catch (error) {
    console.error("Error updating comment", error.message);
    return { status: 500, error: "Error updating comment " + error.message };
  }
}

