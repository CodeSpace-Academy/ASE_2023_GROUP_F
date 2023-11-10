import { Autocomplete, TextField } from "@mui/material";
import { getIngredients } from "@/lib/view-recipes";
import { useEffect, useState } from "react";
import { set } from "lodash";

function MultiSelect() {
  const [uniqueIngredients, setUniqueIngredients] = useState([]);

  async function gettingIngredients() {
    try {
      const result = await getIngredients();
      setUniqueIngredients(result.uniqueIngredients[0].ingredientsArray);
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
      options={uniqueIngredients}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label="Ingredients" />
      )}
    />
  );
}

export default MultiSelect;
