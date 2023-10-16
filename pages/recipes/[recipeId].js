import Details from "@/components/details/details";
import { getViewRecipes } from "@/lib/view-recipes";
import { useEffect, useState } from "react";

function getRecipeById(array, id) {
  return array.find((recipe) => recipe._id === id);
}

function SingleRecipe({ recipeId }) {
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getRecipes = async () => {
      try{
        const results = await getViewRecipes();
        setRecipes(results)
      }catch(error){
        console.log(`something went wrong: ${error}`);
        setError(error)
      }
    }

    getRecipes()
  }, [])

  const arrayOfRecipes = Object.entries(recipes)

  const actualRecipe = getRecipeById(arrayOfRecipes[0][1], recipeId);

  return (
    <>
      <Details recipe={actualRecipe} error={error}/>
    </>
  );
}

export default SingleRecipe;

export async function getServerSideProps({params}){
  const {recipeId} = params

  return{
    props: {
      recipeId
    }
  }
}
