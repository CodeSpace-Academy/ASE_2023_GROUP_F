import Ingredients from "./ingredients/ingredients";
import Instructions from "./instructions/instructions";
import Description from "./description/description";
import { useState } from "react";
import RecipeTags from "../tags/RecipeTags";

import { ToggleButton } from "@mui/material";

function Details(props) {
	const { recipe } = props;

	const [toggleList, setToggleList] = useState("ingredients");
  const [error , setError] = useState(false)
	
	function toggleInstructions() {
		setToggleList("instructions");
	}

	function toggleIngredients() {
		setToggleList("ingredients");
	}
	function toggleTags() {
		setToggleList("tags");
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

			{toggleList === "ingredients" && !error && (
				<Ingredients ingredients={recipe.ingredients} />
			)}

			{toggleList === "instructions" && !error && (
				<Instructions instructions={recipe.instructions} />
			)}
			{toggleList === "tags" && !error && (
				<RecipeTags tags={recipe.tags}/>
			)}
		</>
	);
}

export default Details;
