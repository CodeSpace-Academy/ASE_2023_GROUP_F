import { getViewRecipes } from "@/lib/view-recipes";
import React, { useContext, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { filterContext } from "./filterContext";

export default function MultiSelectList() {
  const { filteredRecipes } = useContext(filterContext);
  const ingredients = filteredRecipes.map((item) => item.ingredients);
  const ingredientsArray = [];

  for (const object of ingredients) {
    for (const key of Object.keys(object)) {
      ingredientsArray.push(key);
    }
  }

  const uniqueIngredients = ingredientsArray.filter((curr, index, arr) => {
    return arr.indexOf(curr) === index;
  });

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <MultiSelect
        options={uniqueIngredients.sort()}
        value={selected}
        onChange={setSelected}
        labelledBy={"Ingredients"}
      />
    </div>
  );
}
