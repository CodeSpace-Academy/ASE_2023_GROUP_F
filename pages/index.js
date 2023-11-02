import React, { useEffect, useContext, useState } from "react";
import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";
import { getRecipes } from "./api/pre-render";
import SearchBar from "@/components/search-functionality/search-bar";
import { getViewRecipes } from "@/lib/view-recipes";
import { filterContext } from "@/components/search-functionality/filterContext";

const PAGE_SIZE = 48;

function Home({ visibleRecipes, count }) {
	const { filters, setFilters, filteredRecipes, setFilteredRecipes } = useContext(filterContext);
  const [NoResults , setNoResults] = useState(false);

	useEffect(() => {
		setFilteredRecipes(visibleRecipes);
	}, [visibleRecipes]);

	const handleApplyFilters = async (filters, sort) => {
		const filtering = await getViewRecipes(0, PAGE_SIZE, filters, sort);
		setFilteredRecipes(filtering.recipes);

    if(filtering.recipes.length === 0 ){

      setNoResults(true);
    }
   
	};

	return (
		<div className="container mx-auto p-4">
			<SearchBar applyFilters={handleApplyFilters} appliedFilters={filters} />
			{NoResults ? <p className="text-red-500">No recipes for the applied filters</p> : (
        <RecipeList
				visibleRecipes={filteredRecipes}
				count={count}
				appliedFilters={filters}
				setRecipes={setFilteredRecipes}
        searchQuery={filters.title}
			/>
      )}
			
		</div>
	);
}

export async function getStaticProps() {

  try {
    const { recipes, count } = await getRecipes(48);
    return {
      props: {
        visibleRecipes: recipes,
        count,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        error: "Failed to fetch data",
      },
    };
  }
}

export default Home;
