// This handles unexpected errors from the client
export const handleError = ({ error, event }) => {
  console.error("Client error:", error);
  
  // Return the error so that it can be displayed to the user
  return {
    message: error.message || "An unexpected error occurred"
  };
};