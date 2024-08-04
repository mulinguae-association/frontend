import axios from 'axios';
import logError from '../utils/logError';

export async function submitBlogPost(newpost) {
  try {
    const response = await axios.post(`/api/blogPosts`, newpost);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Error submitting blog post");
  } catch (error) {
    logError("Error submitting blog post:", error);
    throw new Error(`Error submitting blog post: ${error.message}`);
  }
}

export async function fetchPendingPosts() {
  try {
    const response = await axios.get(`/api/blogPosts/pending`);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Error fetching pending blog posts");
  } catch (error) {
    logError("Error fetching pending blog posts:", error);
    throw new Error(`Error fetching pending blog posts: ${error.message}`);
  }
}

export async function fetchAcceptedPosts(limit) {
  try {
    const response = await axios.get(`/api/blogPosts/accepted?limit=${limit}`);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Error fetching accepted blog posts");
  } catch (error) {
    logError("Error fetching accepted blog posts:", error);
    throw error
  }
}

export async function acceptBlogPost(blogId) {
  try {
    const response = await axios.patch(`/api/blogPosts/${blogId}/accept`);
    if (response.status === 200) {
      return { status: 200, data: response.data };
    }
    return { status: response.status, error: "Error accepting blog post" };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.error;
      return { status: 401, message };
    }
    logError("Error accepting blog post:", error.message);
    return { status: 500, error: `Error accepting blog post: ${error.message}` };
  }
}

export async function removeBlogPost(blogId) {
  try {
    const response = await axios.delete(`/api/blogPosts/${blogId}`);

    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    logError("Error removing blog post:", error);
    throw error
  }
}

export async function searchBlogPosts(query) {
  try {
    const response = await axios.get(`/api/blogPosts/search?q=${query}`);
    if (response.status === 200) {
      return { status: 200, data: response.data };
    }
    logError("Error searching blog posts:", response.status);
    return { status: response.status, error: "Error searching blog posts" };
  } catch (error) {
    logError("Error searching blog posts:", error.message);
    throw error;
  }
}

export async function createComment(blogId, commentData) {
  try {
    const response = await axios.post(`/api/comments/${blogId}`, commentData);
    if (response.status === 201) {
      return { status: 201, data: response.data };
    }
    logError("Error creating comment:", response.status);
    return { status: response.status, error: "Error creating comment" };
  } catch (error) {
    logError("Error creating comment:", error);
    throw error
  }
}

export async function fetchPendingComments() {
  try {
    const response = await axios.get(`/api/comments/pending`);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Error fetching pending comments");
  } catch (error) {
    logError("Error fetching pending comments:", error);
    throw new Error(`Error fetching pending comments: ${error.message}`);
  }
}

export async function acceptComment(commentId) {
  try {
    const response = await axios.patch(`/api/comments/accept/${commentId}`);
    if (response.status === 200) {
      return { status: 200, data: response.data };
    }
    logError("Error accepting comment:", response.status);
    return { status: response.status, error: "Error accepting comment" };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.error;
      return { status: 401, message };
    }
    logError("Error accepting comment:", error.message);
    return { status: 500, error: `Error accepting comment: ${error.message}` };
  }
}

export async function refuseComment(commentId) {
  try {
    const response = await axios.delete(`/api/comments/${commentId}`);
    if (response.status === 200) {
      return { status: response.status, data: response.data };
    }
    logError("Error refusing comment:", response.status);
    return { status: response.status, error: "Error refusing comment" };
  } catch (error) {
    logError("Error refusing comment:", error.message);
    throw error;
  }
}

export async function handleReplySubmit(content, blogId, parentCommentId) {
  try {
    const requestBody = { content, blogId, parentCommentId };
    const response = await axios.post(`/api/comments/reply/${blogId}`, requestBody);
    if (response.status === 201) {
      return { status: 201, data: response.data };
    }
    logError("Error submitting reply:", response.status);
    return { status: response.status, error: "Error submitting reply" };
  } catch (error) {
    logError("Error submitting reply:", error);
    throw error;
  }
}

export async function updatedComment(commentId, requestedBody) {
  try {
    const response = await axios.patch(`/api/comments/update/${commentId}`, requestedBody);
    if (response.status === 201) {
      return { status: 201, data: response.data };
    }
    logError("Error updating comment:", response.status);
    return { status: response.status, error: "Error updating comment" };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const message = error.response.data.error;
      return { status: 401, message };
    }
    logError("Error updating comment:", error.message);
    return { status: 500, error: `Error updating comment: ${error.message}` };
  }
}

export async function interactWithComment(modelType, id, action) {
  try {
    const response = await axios.post(`/api/comments/${modelType}/${id}/${action}`);

    if (response.status === 200) {
      return { status: 200, data: response.data };
    }
    logError(`Error updating comment (Status ${response.status})`);
    return { status: response.status, error: `Error updating comment (Status ${response.status})` };
  } catch (error) {
    logError(`Error updating comment (${action})`, error);
    throw error;
  }
}

export const getAcceptedComments = async () => {
  try {
    const response = await axios.get('/api/comments/accepted');
    return response.data;
  } catch (error) {
    logError('Error retrieving accepted comments:', error);
    throw error;
  }
};
