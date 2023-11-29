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

/**
 * Home component is the main page of the recipe app.
 *
 * It displays a list of recipes, allows users to apply filters, and handles
 * the fetching of initial data for static rendering.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.visibleRecipes - The initially visible list of recipes.
 * @param {number} props.count - The total count of recipes available.
 * @returns {JSX.Element} - The JSX markup for the Home component.
 */

const PAGE_SIZE = 48;

function Home(props) {
	const { visibleRecipes, count } = props;

	// Access filtering context for search functionality
	const { filters, filteredRecipes, setFilteredRecipes, sortOption } = useContext(filterContext);

	// State to manage remaining recipes and loading state
	const [remainingRecipes, setRemainingRecipes] = useState(count);
	const [loading, setLoading] = useState(false);

	// useEffect to handle initial data fetching and filter application
	useEffect(() => {
		const runLoad = async () => {
			try {
				setLoading(true);


				// Check if there are no filters and sorting options applied

				if (JSON.stringify(filters) === "{}" && sortOption === "") {
					setFilteredRecipes(visibleRecipes);
				} else {
					 // Apply filters and sorting options
					await handleApplyFilters(filters, sortOption);
				}
			} finally {
				setLoading(false);
			}
		};
		 // Run the load function
		runLoad();
	}, []);

	// @param {Object} filters - The filters to be applied.
	const handleApplyFilters = async (filters) => {
		const filtering = await getViewRecipes(0, PAGE_SIZE, filters, sortOption);
		setFilteredRecipes(filtering?.recipes);
		setRemainingRecipes(filtering?.totalRecipes);
	};

	return (
		<div>
			<Head>
				<title>Foodie's Delight</title>
				<meta
					name="description"
					content="Welcome to Foodie's Delight, the ultimate companion for culinary enthusiasts and gastronomic adventurers! Unleash your inner chef and explore a world of delectable delights with our intuitive and feature-packed recipe app."
				/>
			</Head>
			<SearchBar
				applyFilters={handleApplyFilters}
				appliedFilters={filters}
				count={remainingRecipes}
			/>
			{loading ? (
				<>
					<CardSkeleton />
					<Animation />
				</>
			) : (!filteredRecipes) ? (
				<HandleError>No recipes found!!</HandleError>
			) : (
				<RecipeList
					visibleRecipes={filteredRecipes}
					count={remainingRecipes}
					appliedFilters={filters}
					setRecipes={setFilteredRecipes}
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
			revalidate: 600,
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
