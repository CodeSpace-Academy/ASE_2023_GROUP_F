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

  useEffect(() => {
    const callViewRecipes = async () => {
      try {
        const result = await getViewRecipes();
        setRecipes(result.recipes);
        const initialVisibleRecipes = result.recipes.slice(0, 100);
        const initialRemainingRecipes = result.count - 100;
        setVisibleRecipes(initialVisibleRecipes);
        setRemainingRecipes(initialRemainingRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    callViewRecipes();
  }, []);

  const showMoreRecipes = () => {
    const nextBatch = recipes.slice(
      visibleRecipes.length,
      visibleRecipes.length + 100
    );
    setVisibleRecipes([...visibleRecipes, ...nextBatch]);
    setRemainingRecipes((prev) => prev - 100);
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
        <CardSkeleton/>
      )}

      {!loading && visibleRecipes.length < recipes.length && (
        <Button onClick={showMoreRecipes} remainingRecipes={remainingRecipes} />
      )}
    </>
  );
};

export default RecipeList;
