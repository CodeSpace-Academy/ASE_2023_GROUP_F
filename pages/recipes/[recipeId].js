import Details from "@/components/details/details";
import { getSingleRecipe } from "@/lib/view-recipes";
import { useState, useEffect } from "react";

function SingleRecipe({ recipeId }) {
  const [recipe, setRecipe] = useState()
  const [error, setError] = useState('')

  useEffect(() => {
    async function getRecipeById(){
      try{
        const result = await getSingleRecipe(recipeId)
        setRecipe(result.recipe);
        console.log('current recipe: ' + result.recipe);
      }catch(error){
        console.log(`something went wrong: ${error}`)
      }
    }

    getRecipeById()
  },[])

  console.log('recipeId recipe :' + recipe)

  return (
    <>
      <Details recipe={recipe} error={error}/>
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
