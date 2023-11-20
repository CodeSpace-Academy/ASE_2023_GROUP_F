const NetworkErrorComponent = ({ retryFunction, message = 'Network Error', buttonText = 'Retry' }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">{message}</strong>
      <span className="block sm:inline">: Unable to fetch data from the server.</span>
      <button
        className="absolute top-0 right-0 px-4 py-3"
        onClick={retryFunction}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NetworkErrorComponent;
