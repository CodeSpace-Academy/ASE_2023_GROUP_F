import { useEffect, useContext , useState } from "react";
import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";
import { getRecipes } from "./api/pre-render";
import SearchBar from "@/components/search-functionality/search-bar";
import { getViewRecipes } from "@/lib/view-recipes";
import { filterContext } from "@/components/search-functionality/filterContext";
import MultiSelectList from "@/components/search-functionality/multi-select-component";

const PAGE_SIZE = 48;

function Home({ visibleRecipes, count }) {
	const { filters , filteredRecipes, setFilteredRecipes, sortOption, setSortOption } = useContext(filterContext);
	const [searchTerm, setSearchTerm] = useState("");
	const [remainingRecipes, setRemainingRecipes] = useState(count);

	useEffect(() => {
		setFilteredRecipes(visibleRecipes);
	}, []);

	const handleApplyFilters = async (filters, sort) => {
		const filtering = await getViewRecipes(0, PAGE_SIZE, filters, sort);
		setFilteredRecipes(filtering.recipes);
		setRemainingRecipes(filtering.totalRecipes);

	};

	return (
		<div>
			<SearchBar
				applyFilters={handleApplyFilters}
				appliedFilters={filters}
				sortOption={sortOption}
				setSortOption={setSortOption}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<RecipeList
				visibleRecipes={filteredRecipes}
				count={remainingRecipes}
				appliedFilters={filters}
				setRecipes={setFilteredRecipes}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
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