import {useState} from 'react';

const RecipeList = () => {
  const [visibleRecipes, setVisibleRecipes] = useState(recipes.slice(0, 20));
  const [remainingRecipes, setRemainingRecipes] = useState(recipes.length - 20);

  const showMoreRecipes = () => {
      const nextBatch = recipes.slice(
          visibleRecipes.length,
          visibleRecipes.length + 20,
      );
      setVisibleRecipes([...visibleRecipes, ...nextBatch]);
      setRemainingRecipes((prev) => prev - 20);
  };

  return (
      <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {visibleRecipes.map((recipe) => (
                  <RecipeCard
                      key={recipe._id}
                      title={recipe.title}
                      images={recipe.images}
                      published={recipe.published}
                  />
              ))}
          </div>
          {visibleRecipes.length < recipes.length && (
              <Button onClick={showMoreRecipes} remainingRecipes={remainingRecipes} />
          )}
      </>
  );
  };
  
  export default RecipeList;