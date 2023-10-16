import { getRecipeById } from "@/dummy_data";
import Details from "@/components/details/details";

function SingleRecipe({ recipe, error}) {
  return (
    <>
      <Details recipe={recipe} error={error}/>
    </>
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
    },
  };
}

export default SingleRecipe;
