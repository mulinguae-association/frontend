const handleError = (error) => {
  let errorMessage = "An error occurred. Please try again later.";

  if (error.response) {
    const { status } = error?.response;
    switch (status) {
      case 400:
        errorMessage = "Bad request. Please check your input and try again.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please log in and try again.";
        break;
      case 403:
        errorMessage = "Forbidden. You don't have permission to access this resource.";
        break;
      case 404:
        errorMessage = "Resource not found. It may have been moved, deleted, or does not exist.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      case 502:
        errorMessage = "Bad gateway. The server received an invalid response.";
        break;
      case 503:
        errorMessage = "Service unavailable. Please try again later.";
        break;
      case 504:
        errorMessage = "Gateway timeout. Please try again later.";
        break;
      default:
        errorMessage = "An error occurred. Please try again later.";
    }
  }

  return errorMessage;
};

export default handleError;
