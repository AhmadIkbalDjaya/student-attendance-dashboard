class ApiError extends Error {
  constructor(message, errors = null) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
  }
}

const handleApiError = (error, defaultMessage) => {
  let errorMessage = defaultMessage ?? "Something went wrong. Please try again";
  let errors = null;

  if (error.response) {
    // jika ada respons dari server
    const { status, data } = error.response;

    if (status >= 500) {
      // Error 5xx: Server-side issue
      errorMessage = "Server error. Please try again";
    } else if (status >= 400 && status < 500) {
      // Error 422: Validation error
      if (status == 422 && data?.errors) {
        errors = data?.errors;
      }
      // Error 4xx: Client-side issue
      errorMessage = data?.message || "Request failed. Check your input";
    }
  } else if (error.request) {
    // Jika tidak ada respons dari server (contoh: timeout, jaringan down)
    errorMessage = "Network error. Please try again";
  }
  throw new ApiError(errorMessage, errors);
};

export default handleApiError;
