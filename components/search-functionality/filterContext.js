import React, { createContext, useContext, useState } from "react";

export const filterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({});
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortOption, setSortOption] = useState({})

  const contextValue = {
    filters,
    setFilters,
    filteredRecipes,
    setFilteredRecipes,
    sortOption,
    setSortOption
  };

  return (
    <filterContext.Provider value={contextValue}>
      {children}
    </filterContext.Provider>
  );
};