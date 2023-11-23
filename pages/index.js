/**
 *
 * This file represents the home page of the recipe application. It includes a search bar,
 * recipe list, and functionality for applying filters to the displayed recipes.
 *
 * @param {Object} props - The properties passed to the Home component.
 * @param {Array} props.visibleRecipes - An array of recipes to be displayed on the home page.
 * @param {number} props.count - The total count of recipes available.
 * @param {Object} filters - The filters to be applied.
 * 
 * @returns {JSX.Element} - The rendered Home component.
 */

import { useEffect, useContext, useState } from "react";
import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";
import { getRecipes } from "./api/pre-render";
import SearchBar from "@/components/search-functionality/search-bar";
import { getViewRecipes } from "@/lib/view-recipes";
import { filterContext } from "@/components/search-functionality/filterContext";
import HandleError from "../components/error/Error";
import Animation from "@/components/skeletonCard/loadingAnimation/LoadingAnimation";
import CardSkeleton from "@/components/skeletonCard/skeleton";

const PAGE_SIZE = 48;

function Home(props) {
	const { visibleRecipes, count } = props;
	const {
		filters,
		setFilters,
		filteredRecipes,
		setFilteredRecipes,
		sortOption,
		setSortOption,
		searchTerm,
		setSearchTerm
	} = useContext(filterContext);

	const [remainingRecipes, setRemainingRecipes] = useState(count);
	const [loading, setLoading] = useState(false);

	// useEffect hook to handle filter changes and update the displayed recipes accordingly.
	useEffect(() => {
		const runLoad = async () => {
			try {
				setLoading(true);
				if (JSON.stringify(filters) === "{}" && sortOption === "") {
					setFilteredRecipes(visibleRecipes);
				} else {
					await handleApplyFilters(filters, sortOption);
				}
			} finally {
				setLoading(false);
			}
		};
		runLoad();
	}, [filters]);

	const handleApplyFilters = async (filters) => {
		const filtering = await getViewRecipes(0, PAGE_SIZE, filters, sortOption);
		setFilteredRecipes(filtering?.recipes);
		setRemainingRecipes(filtering?.totalRecipes);
	};

	return (
		<div>
			<SearchBar
				applyFilters={handleApplyFilters}
				appliedFilters={filters}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				count={remainingRecipes}
			/>
			{loading ? (
				<>
					<CardSkeleton />
					<Animation />
				</>
			) : !filteredRecipes ? (
				 // Error component for no recipes found
				<HandleError>No recipes found!!</HandleError>
			) : (
				<RecipeList
					visibleRecipes={filteredRecipes}
					count={remainingRecipes}
					appliedFilters={filters}
					setRecipes={setFilteredRecipes}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}
		</div>
	);
}

/**
 * getStaticProps function for Next.js to fetch and pre-render data for the Home component.
 *
 * @async
 * @function
 * @returns {Object} - The props to be passed to the Home component.
 */
export async function getStaticProps() {
	try {
		// Fetching recipes and count using the getRecipes API
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
