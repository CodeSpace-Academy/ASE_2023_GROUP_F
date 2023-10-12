import Ingredients from "../ingredients/ingredients";
import Instructions from "../instructions/instructions";
import { useState } from "react";

function Details({recipe, error}) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);

    if (showIngredients) {
      setShowIngredients(false);
    }
  };

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);

    if (showInstructions) {
      setShowInstructions(false);
    }
  };

  return (
    <>
      <h1>{recipe ? recipe.title : "Recipe Not Found"}</h1>

      {error && <p>Failed to load data. Please try again later.</p>}

      <button onClick={toggleIngredients}>
        {showIngredients ? "Hide Ingredients" : "View Ingredients"}
      </button>

      <button onClick={toggleInstructions}>
        {showInstructions ? "Hide Instructions" : "View Instructions"}
      </button>

      {showIngredients && !error && (
        <Ingredients ingredients={recipe.ingredients} />
      )}

      {showInstructions && !error && (
        <Instructions instructions={recipe.instructions} />
      )}
    </>
  );
}

export default Details;
