import React, { useState } from "react";
import RecipeCard from "../card/RecipeCard";
import CardSkeleton from "../skeletonCard/skeleton";
import Button from "../UI/Button";
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
		sortOption,
	} = props;

	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const totalPages = Math.ceil(count / PAGE_SIZE);
	const remainingRecipes = count - visibleRecipes?.length;

	const loadMoreRecipes = async () => {
		setLoading(true);
		const startIndex = currentPage * PAGE_SIZE;
		const skipCount = Math.floor(startIndex / PAGE_SIZE);
		const newLimit = PAGE_SIZE + skipCount * PAGE_SIZE;
		try {
			const documents = await fetch(`/api/filter?limit=${newLimit}&filter=${JSON.stringify(appliedFilters)}&sort=${JSON.stringify(sortOption)}`)
			const result = await documents.json();
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
