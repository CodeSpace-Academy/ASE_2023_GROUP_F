import Details from "@/components/details/details";
import { getSingleRecipe } from "@/lib/view-recipes";
import { useState } from "react";
import { useMount } from "react-use";

function SingleRecipe({ recipeId }) {
  const [recipe, setRecipe] = useState()
  const [error, setError] = useState('')

  useMount(() => {
    async function getRecipeById(){
      try{
        const result = await getSingleRecipe(recipeId)
        console.log(result);
        setRecipe(result.recipe);
      }catch(error){
        console.log(`something went wrong: ${error}`)
      }
    }

    getRecipeById()
  })

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
