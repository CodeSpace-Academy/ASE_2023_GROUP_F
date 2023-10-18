import Details from "@/components/details/details";
import { getSingleRecipe } from "@/lib/view-recipes";
import { useState, useEffect } from "react";

function SingleRecipe({ recipeId }) {
  const [recipe, setRecipe] = useState(null); 
  const [error, setError] = useState('');

  useEffect(() => {
    async function getRecipeById(){
      try {
        const result = await getSingleRecipe(recipeId);
        setRecipe(result.recipe);
      } catch (error) {
        console.error(`something went wrong: ${error}`);
        setError('Error fetching recipe data.'); 
      }
    }

    getRecipeById();
  }, [recipeId]);

  if (recipe === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Details recipe={recipe} error={error} />
    </>
  );
}

export default SingleRecipe;

export async function getServerSideProps({ params }) {
  const { recipeId } = params;

  return {
    props: {
      recipeId
    }
  };
}
