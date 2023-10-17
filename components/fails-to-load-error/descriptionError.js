const Description = ({ recipe }) => {
    try {
      if (!recipe) {
        return <div>Loading please wait...</div>;
      }

      return (
        <>
          <h3 className="mt-2 text-lg font-semibold">Description:</h3>
          <ul className="list-disc list-inside">
            {recipe.description.map((description, index) => (
              <li key={index} className="text-gray-600">
                {description}
              </li>
            ))}
          </ul>
        </>
      );
    } catch (error) {
      console.error("An error occurred:", error);
      return <div>Failed to load Description!</div>;
    }
  };

  export default Description;