import React, { useState , useContext } from "react";
import RecipeCard from "../card/RecipeCard";
import CardSkeleton from "../skeletonCard/skeleton";
import Button from "../UI/Button";
import { getViewRecipes } from "@/lib/view-recipes";
import Highlighter from "react-highlight-words";
import { filterContext } from "../search-functionality/filterContext";

/**
 * RecipeList Component
 *
 * The RecipeList component displays a grid of RecipeCard components, allowing users
 * to view recipes. It supports lazy loading of additional recipes as the user scrolls.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {Array} props.visibleRecipes - The array of recipes currently visible.
 * @param {number} props.count - The total count of recipes, including those not yet loaded.
 * @param {Array} props.appliedFilters - The array of filters applied to the recipes.
 * @param {Function} props.setRecipes - Function to set the recipes in the parent component.
 * @param {Function} props.updateFavoriteRecipesCount - Function to update the count of favorite recipes.
 * @returns {JSX.Element} - The JSX representation of the RecipeList component.
 */

const PAGE_SIZE = 48;
const INITIAL_LOAD_SIZE = 48;

const RecipeList = (props) => {
  
	const {
		visibleRecipes,
		count,
		appliedFilters,
		setRecipes,
		updateFavoriteRecipesCount
	} = props;

	// Accessing the searchTerm from the filterContext
	const {searchTerm} = useContext(filterContext)

	 // State for managing pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const totalPages = Math.ceil(count / PAGE_SIZE);
	const remainingRecipes = count - visibleRecipes?.length;

	// Load more recipes from the server and update the state.
	const loadMoreRecipes = async () => {
		setLoading(true);
		try {
			const startIndex = currentPage * PAGE_SIZE;
			const result = await getViewRecipes(
				startIndex,
				PAGE_SIZE,
				appliedFilters,
			);
			setRecipes([...visibleRecipes, ...result.recipes]);
			setCurrentPage(currentPage + 1);
		} catch (error) {
			console.error("Error fetching more recipes:", error);
		} finally {
			setLoading(false);
		}
	};

	// If still loading or visibleRecipes is not available, display loading skeleton
	if (loading || !visibleRecipes) {
		return <CardSkeleton />;
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  xl:grid-cols-4 gap-8 mt-5">
				{visibleRecipes.map((recipe) => (
					<RecipeCard
						key={recipe._id}
						title={
							<Highlighter
								highlightClassName="YourHighlightClass"
								searchWords={[searchTerm]}
								autoEscape={true}
								textToHighlight={recipe.title}
							/>
						}
						images={recipe.images}
						published={recipe.published}
						recipe={recipe}
						updateFavoriteRecipesCount={updateFavoriteRecipesCount}
					/>
				))}
			</div>
			<div>
				{count > INITIAL_LOAD_SIZE && (
					<div className="mt-4 text-center">
						<p className="text-gray-500 font-bold">
							Showing page {currentPage} of {totalPages}
						</p>
						{remainingRecipes > 0 && (
							<div className="mt-2">
								<Button
									remainingRecipes={remainingRecipes}
									onClick={loadMoreRecipes}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default RecipeList;
