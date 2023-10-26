import React, { useState, useEffect } from 'react';
import RecipeCard from '../card/RecipeCard';
import CardSkeleton from '../skeletonCard/skeleton';
import { getViewRecipes, getViewRecipesBySteps, getViewRecipesByAscending, getViewRecipesByDescending } from '../../lib/view-recipes';
import Button from '../UI/Button';
import FilterBySteps from '../search-functionality/number-of-steps-filter';

const PAGE_SIZE = 50;
const INITIAL_LOAD_SIZE = 50;

const RecipeList = (props) => {
  const { visibleRecipes : initialRecipes, count } = props;
  const [visibleRecipes, setVisibleRecipes] = useState(initialRecipes);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  if( !visibleRecipes){

    return <p>Loading...</p>
  }

  const remainingRecipes = count - visibleRecipes.length;

  const filter = {
		// tags: {
		// 	$elemMatch: {
		// 		$eq: "Vegan",
		// 	},
		// },
		// category: "Vegetable",
		// "instructions.4": {
		// 	$exists: false,
		// },
		// "ingredients.flour": {
		// 	$exists: true,
		// },
    title: 'Cabbage Soup'
	};

  
  const loadMoreRecipes = async () => {
    setLoading(true);
    try {
      const startIndex = currentPage * PAGE_SIZE ; 
      const result = await getViewRecipes(startIndex, PAGE_SIZE);
      setVisibleRecipes([...visibleRecipes, ...result.recipes]);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error('Error fetching more recipes:', error);
    } finally {
      setLoading(false);
    }
  };
  
  async function filterByNumberOfSteps(){
    setLoading(true);
    try{
      const startIndex = currentPage * PAGE_SIZE ; 
      const result = await getViewRecipes(startIndex, PAGE_SIZE, filter);
      setVisibleRecipes([...visibleRecipes,...result.recipes]);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error('Error fetching more recipes:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <FilterBySteps filterFunc={filterByNumberOfSteps}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {visibleRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            title={recipe.title}
            images={recipe.images}
            published={recipe.published}
            recipe={recipe}
          />
        ))}
        {loading && <div className="skeleton-container"><CardSkeleton/></div>} 
        {count > INITIAL_LOAD_SIZE && (
          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Showing page {currentPage} of {totalPages}
            </p>
            {remainingRecipes > 0 && (
              <div className="mt-2">
                <Button remainingRecipes={remainingRecipes} onClick={loadMoreRecipes} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeList;
