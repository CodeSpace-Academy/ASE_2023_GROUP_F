import React, { useState, useEffect } from 'react';
import RecipeCard from '../card/RecipeCard';
import Button from '../UI/Button';
import { getViewRecipes } from '../../lib/view-recipes';
import CardSkeleton from '../skeletonCard/skeleton';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [remainingRecipes, setRemainingRecipes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const callViewRecipes = async () => {
      try {
        const result = await getViewRecipes(limit);
        setRecipes(result.recipes);
        const initialVisibleRecipes = result.recipes.slice(0, limit);
        const initialRemainingRecipes = result.count - limit;
        setVisibleRecipes(initialVisibleRecipes);
        setRemainingRecipes(initialRemainingRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    callViewRecipes();
  }, [limit]);

  const showMoreRecipes = () => {
    setLimit(prevLimit => prevLimit + 100);
  };

  return (
    <>
      {!loading && visibleRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {visibleRecipes.map(recipe => (
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

      {!loading && remainingRecipes > 0 && (
        <Button onClick={showMoreRecipes} remainingRecipes={remainingRecipes} />
      )}
    </>
  );
};

export default RecipeList;
