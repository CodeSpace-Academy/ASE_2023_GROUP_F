import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import RecipeList from '../../../components/recipe-collection/RecipeList';
import CardSkeleton from '../../../components/skeletonCard/skeleton';
import { getFavoriteRecipes } from '../../../lib/view-recipes';

/**
 * Functional component for the Favorite Recipes page.
 *
 * @component
 * @returns {JSX.Element} The JSX representation of the Favorite Recipes page.
 */

function FavoriteRecipesPage() {
  // State variables for managing favorite recipes, loading state, and count
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteRecipesCount, setFavoriteRecipesCount] = useState(0);

  // Effect hook to fetch favorite recipes on component mount.
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        // Fetch favorite recipes and update state
        const recipes = await getFavoriteRecipes();
        setFavoriteRecipes(recipes.favoriteRecipes);
        setFavoriteRecipesCount(recipes.count);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      } finally {
        // Set loading state to false when fetching is complete
        setIsLoading(false);
      }
    };

    // Call the fetch function on component mount
    fetchFavoriteRecipes();
  }, []);

  /**
   * Updates the count of favorite recipes based on the visibility state of a recipe card.
   * @param {Object} newState - The state object containing visibility information.
   */
  const updateFavoriteRecipesCount = (newState) => {
    setFavoriteRecipesCount((prevCount) => {
      // Decrease count when a recipe card becomes invisible
      if (newState.isVisible === false) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };

  if (!favoriteRecipes) {
    return <CardSkeleton />;
  }

  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta
          name="description"
          content="Welcome to Flavorful Favorites, your personal culinary haven where cherished recipes and unforgettable flavors converge."
        />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="lg:text-3xl md:text-sm font-bold mb-4 text-gray-500">
          Favorite Recipes ({favoriteRecipesCount})
        </h1>
        {isLoading ? (
          <CardSkeleton />
        ) : favoriteRecipesCount > 0 ? (
          <RecipeList visibleRecipes={favoriteRecipes} updateFavoriteRecipesCount={updateFavoriteRecipesCount} />
        ) : (
          <p className="text-gray-600 text-3xl font-bold">No favorite recipes found.</p>
        )}
      </div>
    </>
  );
}

export default FavoriteRecipesPage;
