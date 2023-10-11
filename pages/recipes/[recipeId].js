import { useRouter } from "next/router";
import { useState } from "react";
import { getRecipeById } from "@/dummy_data";
import Instructions from "@/components/instructions/instructions";
import Ingredients from "@/components/ingredients/ingredients";
import Details from "@/components/description/details";

function SingleRecipe({ recipe, error, recipeIdProp }) {
  const router = useRouter();
  const { recipeId } = router.query;

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
    <div>
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

      <Details data={recipeIdProp} error={error} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { recipeId } = params;
  let recipe = null;
  let error = false;

  try {
    // Fetch the recipe data from the API based on recipeId
    recipe = await getRecipeById(recipeId);
  } catch (e) {
    // Handle the error and set the 'error' flag
    console.error("Error fetching recipe:", e);
    error = true;
  }

  return {
    props: {
      recipe,
      error,
      recipeIdProp: recipeId,
    },
  };
}

export default SingleRecipe;
