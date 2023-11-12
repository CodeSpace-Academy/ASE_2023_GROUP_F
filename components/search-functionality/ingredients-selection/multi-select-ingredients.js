import { Autocomplete, TextField } from "@mui/material";
import { getIngredients } from "@/lib/view-recipes";
import { useEffect, useState } from "react";

function MultiSelect({ingredients, setIngredients, ingredientsOptions, setIngredientsOptions}) {

  async function gettingIngredients() {
    try {
      const result = await getIngredients();
      setIngredients(result.uniqueIngredients[0].ingredientsArray);
    } catch (error) {
      console.log("Error fetching more recipes: ", error);
    }
  }

  useEffect(() => {
    try {
      gettingIngredients();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }, []);

  return (
    <Autocomplete
      multiple
      id="ingredients"
      options={ingredients}
      getOptionLabel={(option) => option}
      value={ingredientsOptions}
      onChange={(event, newValue) => {
        setIngredientsOptions(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Ingredients" />
      )}
    />
  );
}

export default MultiSelect;
