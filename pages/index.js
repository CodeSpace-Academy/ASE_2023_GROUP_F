import { useEffect, useContext, useState } from "react";
import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";
import { getRecipes } from "./api/pre-render";
import SearchBar from "@/components/search-functionality/search-bar";
import { getViewRecipes } from "@/lib/view-recipes";
import { filterContext } from "@/components/search-functionality/filterContext";
import { Button } from "@mui/material";

const PAGE_SIZE = 48;

function Home({ visibleRecipes, count }) {
	const { filters, setFilters, filteredRecipes, setFilteredRecipes } = useContext(filterContext);
	const [NoResults, setNoResults] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [remainingCount, setRemainingCount] = useState(count - PAGE_SIZE);

	useEffect(() => {
		if (Object.keys(filters).length === 0) {
			setFilteredRecipes(visibleRecipes);
		} else {
			handleApplyFilters(filters);
		}
	}, []);

	const handleApplyFilters = async (filters, sort, page = 1) => {
		const filtering = await getViewRecipes((page - 1) * PAGE_SIZE, PAGE_SIZE, filters, sort);
		setFilteredRecipes(filtering.recipes);
		setRemainingCount(filtering.recipes.length - page * PAGE_SIZE);

		if (filtering.recipes.length === 0) {
			setNoResults(true);
		} else {
			setNoResults(false);
		}

		setCurrentPage(page);
	};

	const handleLoadMore = () => {
		const nextPage = currentPage + 1;
		handleApplyFilters(filters, undefined, nextPage);
	};

	return (
		<>
			<SearchBar applyFilters={handleApplyFilters} appliedFilters={filters} />
			{NoResults ? (
				<p className="text-red-500">No recipes for the applied filters</p>
			) : (
				<>
					<RecipeList
						visibleRecipes={filteredRecipes}
						count={count}
						appliedFilters={filters}
						setRecipes={setFilteredRecipes}
						searchQuery={filters.title}
					/>
					{remainingCount > 0 && (
						<Button remainingRecipes={remainingCount} className="mt-4" onClick={handleLoadMore}/>
						
					)}
				</>
			)}
		</>
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
