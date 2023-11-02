import React, { useEffect, useContext, useState } from "react";
import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";
import { getRecipes } from "./api/pre-render";
import SearchBar from "@/components/search-functionality/search-bar";
import { getViewRecipes } from "@/lib/view-recipes";
import SearchInput from "../components/keaSearchInput/SearchInput";
import { filterContext } from "../components/search-functionality/filterContext";

const PAGE_SIZE = 48;

function Home({ visibleRecipes, count }) {
	const { filters, setFilters, filteredRecipes, setFilteredRecipes } = useContext(filterContext);

	useEffect(() => {
		setFilteredRecipes(visibleRecipes);
	}, []);

	const handleApplyFilters = async (filters, sort) => {
		const filtering = await getViewRecipes(0, PAGE_SIZE, filters, sort);
		setFilteredRecipes(filtering.recipes);
	};

	return (
		<div>
			<SearchBar applyFilters={handleApplyFilters} appliedFilters={filters} />
			<SearchInput />
			<RecipeList
				visibleRecipes={filteredRecipes}
				count={count}
				appliedFilters={filters}
				setRecipes={setFilteredRecipes}
			/>
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
