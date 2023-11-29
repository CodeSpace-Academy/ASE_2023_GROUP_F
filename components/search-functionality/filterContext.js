import { createContext, useState } from "react";

/**
 * Context for managing filters and search terms within the application.
 * 
 * @typedef {Object} FilterContext
 * @property {Object} filters - The current filter settings.
 * @property {function} setFilters - Function to update the filter settings.
 * @property {Array} filteredRecipes - The recipes filtered based on applied filters.
 * @property {function} setFilteredRecipes - Function to update the filtered recipes.
 * @property {string} sortOption - The current sorting option for recipes.
 * @property {function} setSortOption - Function to update the sorting option.
 * @property {Object} selectedFilters - The selected filters for categories, tags, ingredients, and instructions.
 * @property {function} setSelectedFilters - Function to update the selected filters.
 * @property {boolean} noFiltersApplied - A flag indicating whether no filters are currently applied.
 * @property {function} setNoFiltersApplied - Function to update the flag indicating no filters applied.
 * @property {string} searchTerm - The current search term.
 * @property {function} setSearchTerm - Function to update the search term.
 */

export const filterContext = createContext();

export const FilterProvider = ({ children }) => {

	// State for managing filters, sort option, selected filters, and search term
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

	// Context value object to be provided to the context provider
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
		setSearchTerm
	};

	return (
		<filterContext.Provider value={contextValue}>
			{children}
		</filterContext.Provider>
	);
};
