import Rea { createContext, useState } from "react";

export const filterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({});
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [noFiltersApplied, setNoFiltersApplied] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    tags: [],
    ingredients: null,
    instructions: null,
  });

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    filters,
    setFilters,
    filteredRecipes,
    setFilteredRecipes,
    sortOption,
    setSortOption,
    selectedFilters,
    setSelectedFilters,
    noFiltersApplied,
    setNoFiltersApplied,
    searchTerm,
    setSearchTerm,
  };

  return (
    <filterContext.Provider value={contextValue}>
      {children}
    </filterContext.Provider>
  );
}
