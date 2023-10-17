const Instruction = ({ recipe }) => {
    try {
      if (!recipe) {
        return <div>Loading please wait...</div>;
      }

      return (
        <>
          <h3 className="mt-2 text-lg font-semibold">Instruction:</h3>
          <ul className="list-disc list-inside">
            {recipe.instruction.map((instruction, index) => (
              <li key={index} className="text-gray-600">
                {instruction}
              </li>
            ))}
          </ul>
        </>
      );
    } catch (error) {
      console.error("An error occurred:", error);
      return <div>Failed to load Instruction!</div>;
    }
  };

  export default Instruction;