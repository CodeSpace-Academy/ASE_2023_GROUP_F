import { useState, useEffect } from 'react';
import RecipeCard from '../card/RecipeCard';
import Button from '../UI/Button';
import { getViewRecipes } from '../../lib/view-recipes';
import Link from 'next/link';

const RecipeList = () => {
  const [recipes , setRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [remainingRecipes, setRemainingRecipes] = useState(0);

  useEffect(() => {
    const callViewRecipes = async () => {
        try {
            const result = await getViewRecipes();
            setRecipes(result.recipes);
            const initialVisibleRecipes = result.recipes.slice(0, 20);
            const initialRemainingRecipes = result.recipes.length - 20;
            setVisibleRecipes(initialVisibleRecipes);
            setRemainingRecipes(initialRemainingRecipes);
          }catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    callViewRecipes();
  }, []);

 

  if (recipes.length === 0) {
    return <p>Loading...</p>;
  }

  const showMoreRecipes = () => {
    const nextBatch = recipes.slice(
      visibleRecipes.length,
      visibleRecipes.length + 20
    );
    setVisibleRecipes([...visibleRecipes, ...nextBatch]);
    setRemainingRecipes((prev) => prev - 20);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {visibleRecipes.map((recipe) => (
        <Link href={`/recipes/${recipe._id}`}>
		  <RecipeCard
            key={recipe._id}
            title={recipe.title}
            images={recipe.images}
            published={recipe.published}
            recipe={recipe}
          /></Link>
        ))}
      </div>
      {visibleRecipes.length < recipes.length && (
        <Button onClick={showMoreRecipes} remainingRecipes={remainingRecipes} />
      )}
    </>
  );
};

export default RecipeList;