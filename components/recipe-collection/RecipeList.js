import React, { useState } from 'react';
import RecipeCard from '../card/RecipeCard';
import CardSkeleton from '../skeletonCard/skeleton';
import { getViewRecipes } from '../../lib/view-recipes';

const PAGE_SIZE = 50;

const RecipeList = ({ recipes, count }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleRecipes, setVisibleRecipes] = useState(recipes.slice(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(count / PAGE_SIZE);
  const remainingRecipes = count - currentPage * PAGE_SIZE;

  const showMoreRecipes = async () => {
    if (currentPage < totalPages) {
      setLoading(true);
      try {
        const nextPage = currentPage + 1;
        const result = await getViewRecipes(nextPage * PAGE_SIZE);
        setVisibleRecipes(result.recipes.slice((nextPage - 1) * PAGE_SIZE, nextPage * PAGE_SIZE));
        setCurrentPage(nextPage);
      } catch (error) {
        console.error('Error fetching more recipes:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const showPreviousRecipes = () => {
    if (currentPage > 1) {
      setLoading(true);
      const previousPage = currentPage - 1;
      setVisibleRecipes(recipes.slice((previousPage - 1) * PAGE_SIZE, previousPage * PAGE_SIZE));
      setCurrentPage(previousPage);
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && visibleRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {visibleRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              title={recipe.title}
              images={recipe.images}
              published={recipe.published}
              recipe={recipe}
            />
          ))}
        </div>
      ) : (
        <CardSkeleton />
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-between mt-4">
          {currentPage > 1 && (
            <button
              onClick={showPreviousRecipes}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button
              onClick={showMoreRecipes}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          )}
        </div>
      )}

      {remainingRecipes > 0 && (
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Show Remaining ({remainingRecipes})
          </button>
        </div>
      )}
    </>
  );
};

export default RecipeList;
