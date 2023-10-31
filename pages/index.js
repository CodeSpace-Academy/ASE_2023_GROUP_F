import React, { useState } from "react";
import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";
import { getRecipes } from "./api/pre-render";
import SearchBar from "@/components/search-functionality/search-bar";
import { getViewRecipes } from "@/lib/view-recipes";

const PAGE_SIZE = 48;

function Home({ visibleRecipes, count }) {
	const [filteredRecipes, setFilteredRecipes] = useState(visibleRecipes);
	const [filteredRecipesCount, setFilteredRecipesCount] = useState(count);
  const [appliedFilters , setAppliedFilters] = useState({});

	const handleApplyFilters = async (filters) => {
		const filtering = await getViewRecipes(0, PAGE_SIZE, filters );
		setFilteredRecipes(filtering.recipes);
		setFilteredRecipesCount(filtering.totalRecipes);

		
	};

  

	return (
		<div>
			<SearchBar applyFilters={handleApplyFilters} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />
			<RecipeList
				visibleRecipes={filteredRecipes}
				count={filteredRecipesCount}
				appliedFilters={appliedFilters}
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
