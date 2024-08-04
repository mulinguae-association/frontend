import { notifyError } from "../components/Notify";

const handleError = (error) => {
  let errorMessage = "An unexpected error occurred. Please try again later.";

  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 400:
        errorMessage = "Bad request. Please check your input and try again.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please log in and try again.";
        break;
      case 403:
        errorMessage = "Forbidden. You do not have permission to access this resource.";
        break;
      case 404:
        errorMessage = "The requested resource could not be found. It may have been moved, deleted, or does not exist.";
        break;
      case 500:
        errorMessage = "There was a problem with the server. Please try again later.";
        break;
      case 502:
        errorMessage = "Bad gateway. The server received an invalid response from the upstream server.";
        break;
      case 503:
        errorMessage = "Service unavailable. The server is currently unable to handle the request due to maintenance or overload.";
        break;
      case 504:
        errorMessage = "Gateway timeout. The server did not receive a timely response from the upstream server.";
        break;
      default:
        errorMessage = "An unexpected error occurred. Please try again later.";
    }
  }

  notifyError(errorMessage);
};

export default handleError;