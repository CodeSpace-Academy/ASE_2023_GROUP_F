import Ingredients from "./ingredients/ingredients";
import Instructions from "./instructions/instructions";
import Description from "./description/description";
import { useState } from "react";

import { ToggleButton } from "@mui/material";

function Details({recipe, error}) {
  const [toggleList, setToggleList] = useState('ingredients');

  function toggleInstructions(){
    setToggleList('instructions')
  } 

  function toggleIngredients(){
    setToggleList('ingredients')
  }

  if(error){
    return <div>Error: {error}</div>
  }

  if(!recipe){
    return <div>Loading...</div>
  }

  return (
    <>
      <Description description={recipe.description} title={recipe.title} nutrition={recipe.nutrition} prepTime={recipe.prep}/>

      {error && <p>Failed to load data. Please try again later.</p>}

      <ToggleButton value="ingredients" onClick={toggleIngredients}>Ingredients</ToggleButton>
      <ToggleButton value="instructions" onClick={toggleInstructions}>Instructions</ToggleButton>

      {toggleList === 'ingredients' && !error && (
        <Ingredients ingredients={recipe.ingredients} />
      )}

      {toggleList === 'instructions' && !error && (
        <Instructions instructions={recipe.instructions} />
      )}
    </>
  );
}

export default Details;
