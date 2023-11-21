/**
 * RecipeList Component
 * @param {Object} props - Component properties
 * @param {Array} props.visibleRecipes - List of visible recipes to display.
 * @param {number} props.count - Total count of recipes (including not visible).
 * @param {Array} props.appliedFilters - Filters applied to the recipes.
 * @param {Function} props.setRecipes - Function to set the list of recipes.
 * @param {string} props.searchTerm - Search term used for highlighting.
 * 
 * @returns {JSX.Element} RecipeList component
 */

import React, { useState } from "react";
import RecipeCard from "../card/RecipeCard";
import CardSkeleton from "../skeletonCard/skeleton";
import Button from "../UI/Button";
import { getViewRecipes } from "@/lib/view-recipes";
import Highlighter from "react-highlight-words";

const PAGE_SIZE = 48;
const INITIAL_LOAD_SIZE = 48;

const RecipeList = (props) => {
  
	const {
		visibleRecipes,
		count,
		appliedFilters,
		setRecipes,
		searchTerm,
	} = props;

	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const totalPages = Math.ceil(count / PAGE_SIZE);
	const remainingRecipes = count - visibleRecipes?.length;

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

	if (loading || !visibleRecipes) {
		return <CardSkeleton />;
	}

	return (
		<>
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 mt-5">
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
			/>
		  ))}
		</div>
		<div className="mt-4 text-center">
		  {count > INITIAL_LOAD_SIZE && (
			<>
			  <p className="text-gray-500 font-bold">
				Showing page {currentPage} of {totalPages}
			  </p>
			  {remainingRecipes > 0 && (
				<div className="mt-2">
				  <Button remainingRecipes={remainingRecipes} onClick={loadMoreRecipes} />
				</div>
			  )}
			</>
		  )}
		</div>
	  </>
	);
};

export default RecipeList;
