import React, { createContext, useState } from "react";

export const filterContext = createContext();

export const FilterProvider = ({ children }) => {
	const [filters, setFilters] = useState({});
	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [sortOption, setSortOption] = useState("");
	const [selectedFilters, setSelectedFilters] = useState({
			category: null,
			tags: [],
			ingredients: null,
			instructions: null,
		});

	const contextValue = {
		filters,
		setFilters,
		filteredRecipes,
		setFilteredRecipes,
		sortOption,
		setSortOption,
		selectedFilters,
		setSelectedFilters,
	};

	return (
		<filterContext.Provider value={contextValue}>
			{children}
		</filterContext.Provider>
	);
};
