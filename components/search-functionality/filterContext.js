import React, { createContext, useContext, useState } from "react";

export const filterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    categories:"",
    tags:"",
    instructions: null,
    ingredients: "",
  });


  // const [categories, setCategories] = useState('')
  // const [tags, setTags] = useState('')
  // const [instructionsFilter, setInstructionsFilter] = useState(null)
  // const [ingredients, setIngredients] = useState('')


  // const [filteredRecipes, setFilteredRecipes] = useState([]);

  return (
    <filterContext.Provider value={{ filters, setFilters}}>
      {children}
    </filterContext.Provider>
  );
};
