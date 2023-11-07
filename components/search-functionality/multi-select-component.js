import React, { useContext, useState } from "react";
import { filterContext } from "./filterContext";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

export default function MultiSelectList() {
  const [ ingredientsList, setIngredientsList ] = useState([]);
  const { filteredRecipes } = useContext(filterContext);

  const ingredients = filteredRecipes.map((item) => item.ingredients);
  
  const ingredientsArray = [];
  for (const object of ingredients) {
    for (const key of Object.keys(object)) {
      ingredientsArray.push(key);
    }
  }

  const arrayIngredients = ingredientsArray.filter((curr, index, arr) => {
    return arr.indexOf(curr) === index;
  });

  const uniqueIngredients = arrayIngredients.map((value) => ({title: value}))

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={uniqueIngredients}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} label="Ingredients" />
      )}
      onChange={(event, newValue) => {
        setIngredientsList([...newValue])
      }}
    />
  );
}
