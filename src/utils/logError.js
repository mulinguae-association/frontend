function logError(message, error) {
  if (import.meta.env && import.meta.env.DEV) {
    console.error(message, error);
  }
}

export default logError;
