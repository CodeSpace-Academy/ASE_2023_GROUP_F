//HandleNetworkError accepts two props: children (which represents the content you want to render, such as description, instructions, or tags) and errorType, which specifies the type of error (description, instructions, or tags).
const HandleNetworkError = ({ children, errorType }) => {
  const errorMessage = getErrorMessage(errorType);

  if (errorMessage) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
        <p className="font-bold">Error:</p>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return children;
};


//The getErrorMessage function maps the errorType to the appropriate error message.
function getErrorMessage(errorType) {
  switch (errorType) {
    case "description":
      return "Failed to load description";
    case "instructions":
      return "Failed to load instructions";
    case "tags":
      return "Failed to load tags";
    default:
      return null;
  }
}

export default HandleNetworkError;
