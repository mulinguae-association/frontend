function logError(message, error) {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
  }
}

export default logError;