import axios from 'axios';

export async function submitBlogPost(title, subTitle, content, avatar) {
  try {
    const response = await axios.post(`/api/blogPosts`, {
      title,
      subTitle,
      content,
      avatar
    });

    if (response.status === 200) {
      console.log("Blog post submitted successfully");
      // Reset form fields
      return response.data;
    } else {
      throw new Error("Error submitting blog post");
    }
  } catch (error) {
    throw new Error("Error submitting blog post: " + error.message);
  }
}

export async function fetchPendingPosts() {
  try {
    const response = await axios.get(`/api/blogPosts/pending`);

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
    const response = await axios.get(`/api/blogPosts/accepted?limit=${limit}`);

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
    const response = await axios.patch(`/api/blogPosts/${blogId}/accept`);
    if (response.status === 200) {
      return { status: 200, data: response.data }
    } else {
      return { status: response.status, Error: "Error accepting blog post" }
    }
  }
  catch (error) {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.error;
      return { status: 401, message };
    } else
      console.error("Error creating comment:", error.message);
    return { status: 500, error: "Error creating comment: " + error.message };
  }
}

export async function removeBlogPost(blogId) {
  try {
    const response = await axios.delete(`/api/blogPosts/${blogId}`);

    if (response.status === 200) {
      return response.data
    } else {
      return response.data
    }
  }
  catch (error) {
    return { error: error.response.data.error }
  }

}

export async function searchBlogPosts(query) {
  try {
    const response = await axios.get(`/api/blogPosts/search?q=${query}`)
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
    const response = await axios.post(`/api/comments/${blogId}`, commentData);
    console.log("Response from createComment:", response);

    if (response.status === 201) {
      return { status: 201, data: response.data };
    } else {
      console.error("Error creating comment:", response.status);
      return { status: response.status, error: "Error creating comment" };
    }
  } catch (error) {
    console.log(error)
    if (error.response && error.response.status === 401) {
      const message = error.response.data.error;
      return { status: 401, message };
    } else
      console.error("Error creating comment:", error.message);
    return { status: 500, error: "Error creating comment: " + error.message };
  }
}
export async function fetchPendingComments() {
  try {
    const response = await axios.get(`/api/comments/pending`);

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
    const response = await axios.patch(`/api/comments/accept/${commentId}`);
    if (response.status === 200) {
      return { status: 200, data: response.data };
    } else {
      console.error("Error accepting comment", response.status);
      return { status: response.status, error: "Error accepting comment" };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.error;
      return { status: 401, message };
    } else
      console.error("Error creating comment:", error.message);
    return { status: 500, error: "Error creating comment: " + error.message };
  }
}
export async function refuseComment(commentId) {
  try {
    const response = await axios.delete(`/api/comments/${commentId}`);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    } else {
      console.error("Error refusing comment", response.status);
      return { status: response.status, error: "Error refusing comment" };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.error;
      return { status: 401, message };
    } else
      console.error("Error creating comment:", error.message);
    return { status: 500, error: "Error creating comment: " + error.message };
  }
}

export async function handleReplySubmit(content, blogId, parentCommentId) {
  try {
    const requestBody = {
      content,
      parentCommentId,
    };

    const response = await axios.post(`/api/comments/reply/${blogId}`, requestBody);
    if (response.status === 201) {
      return { status: 201, data: response.data };
    } else {
      console.error("Error submitting reply", response.status);
      return { status: response.status, error: "Error submitting reply" };
    }
  } catch (error) {
    const message = error.response.data.error;
    if (error.response && error.response.status === 401) {
      return { status: 401, message }
    }
  }
}

export async function updatedComment(commentId, requestedBody) {
  try {
    const response = await axios.patch(`/api/comments/update/${commentId}`, requestedBody);
    if (response.status === 201) {
      return { status: 201, data: response.data };
    } else {
      console.error("Error updating comment", response.status);
      return { status: response.status, error: "Error updating comment" };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.error;
      return { status: 401, message };
    } else
      if (error.response && error.response.status === 401) {
        const message = error.response.data.error;
        return { status: 401, message };
      } else
        console.error("Error creating comment:", error.message);
    return { status: 500, error: "Error creating comment: " + error.message };
  }
}
export async function interactWithComment(modelType, id, action) {

  try {
    const response = await axios.post(`/api/comments/${modelType}/${id}/${action}`);

    if (response.status === 200) {
      return { status: 200, data: response.data };
    } else {
      console.error(`Error updating comment (Status ${response.status})`);
      return { status: response.status, error: `Error updating comment (Status ${response.status})` };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.error;
      return { status: 401, message };
    } else {
      console.error(`Error updating comment (${action})`, error);
      return { status: 500, error: `Error updating comment (${action})` };
    }

  }
}

export const getAcceptedComments = async () => {
  try {
    const response = await axios.get('/api/comments/accepted');
    return response.data;
  } catch (error) {
    console.error('Error retrieving accepted comments:', error);
    throw error;
  }
};