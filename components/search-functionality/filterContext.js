import { createContext, useState } from 'react';

/**
 * Filter Context
 *
 * @typedef {Object} FilterContext
 * @property {Object} filters - The filters applied to recipes.
 * @property {Function} setFilters - Function to set the filters.
 * @property {Array} filteredRecipes - List of recipes after applying filters.
 * @property {Function} setFilteredRecipes - Function to set the filtered recipes.
 * @property {string} sortOption - The current sorting option for recipes.
 * @property {Function} setSortOption - Function to set the sorting option.
 * @property {Object} selectedFilters - The selected filters for categories, tags, ingredients, and instructions.
 * @property {Function} setSelectedFilters - Function to set the selected filters.
 * @property {boolean} noFiltersApplied - Flag indicating whether no filters are currently applied.
 * @property {Function} setNoFiltersApplied - Function to set the flag for no filters applied.
 * @property {string} searchTerm - The current search term for recipes.
 * @property {Function} setSearchTerm - Function to set the search term.
 */

export const filterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({});
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [noFiltersApplied, setNoFiltersApplied] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    tags: [],
    ingredients: null,
    instructions: null,
  });

  // Context value to be provided to consumers
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

  return <filterContext.Provider value={contextValue}>{children}</filterContext.Provider>;
}
