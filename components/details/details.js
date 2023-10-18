import Ingredients from "./ingredients/ingredients";
import Instructions from "./instructions/instructions";
import Description from "./description/description";
import RecipeTags from "../tags/RecipeTags";
import { useEffect, useState } from "react";
import { getAllergens } from "@/lib/view-recipes";

import { ToggleButton } from "@mui/material";
import RecipeAllergens from "../allergens/allergens";

function Details(props) {
	const { recipe } = props;

	const [toggleList, setToggleList] = useState("ingredients");
  const [error , setError] = useState(false)
  const [allergens , setAllergens] = useState([])
  const [ingredients , setIngridients] = useState([])

  if(!allergens){
	return <p>There are no allergens</p>
  }


  useEffect(()=>{

	const callAllergens = async()=>{

		try{
			const allergens = await getAllergens()
			setAllergens(allergens.allergens)
			setIngridients(recipe.ingredients)

		}catch(error){

			console.error(error)
		}
	}

	callAllergens()
  },[])

  console.log(allergens.allergens)
	
	function toggleInstructions() {
		setToggleList("instructions");
	}

	function toggleIngredients() {
		setToggleList("ingredients");
	}

	function toggleTags() {
		setToggleList("tags");
	}
	function toggleAllergens() {
		setToggleList("allergens");
	}

	return (
		<>
			<Description
				description={recipe.description}
				title={recipe.title}
				nutrition={recipe.nutrition}
				prepTime={recipe.prep}
			/>


			<ToggleButton value="ingredients" onClick={toggleIngredients}>
				Ingredients
			</ToggleButton>
			<ToggleButton value="instructions" onClick={toggleInstructions}>
				Instructions
			</ToggleButton>
			<ToggleButton value="tags" onClick={toggleTags}>
				Tags
			</ToggleButton>
			<ToggleButton value="allergens" onClick={toggleAllergens}>
				Allergens
			</ToggleButton>

			{toggleList === "ingredients" && !error && (
				<Ingredients ingredients={recipe.ingredients} />
			)}

			{toggleList === "instructions" && !error && (
				<Instructions instructions={recipe.instructions} />
			)}
			{toggleList === "tags" && !error && (
				<RecipeTags tags={recipe.tags}/>
			)}
			{toggleList === "allergens" && !error && (
			<RecipeAllergens allergens={allergens} ingredients={ingredients}/>
			)}
		</>
	);
}

export default Details;
