//Network error

const HandleNetworkError = ({ recipe, message, datakey, children }) => {
  try {
    if (!recipe) {
      return <div>Loading please wait...</div>;
    }

    return (
      <>
        <h3 className="mt-2 text-lg font-semibold">{message}:</h3>
        <ul className="list-disc list-inside">
          {recipe[datakey].map((item, index) => (
            <li key={index} className="text-gray-600">
              {item}
            </li>
          ))}
        </ul>
        {children}
      </>
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return <div>Failed to load {message}!</div>;
  }
};

export default HandleNetworkError;
