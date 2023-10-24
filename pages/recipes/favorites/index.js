import React, { useState, useEffect } from 'react';
import RecipeList from '@/components/recipe-collection/RecipeList';
import CardSkeleton from '@/components/skeletonCard/skeleton';

const FavoriteRecipesPage = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            try {
                const response = await fetch('/api/recipes');
                if (response.ok) {
                    const data = await response.json();
                    const favoriteRecipes = data.recipes.filter(recipe => recipe.isFavorite);
                    setFavoriteRecipes(favoriteRecipes);
                } else {
                    console.error('Failed to fetch favorite recipes');
                }
            } catch (error) {
                console.error('Error fetching favorite recipes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteRecipes();
    }, []);

    if (isLoading) {
        return <CardSkeleton/>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Favorite Recipes ({favoriteRecipes.length})</h1>
            {favoriteRecipes.length > 0 ? (
                <RecipeList visibleRecipes={favoriteRecipes} />
            ) : (
                <p className="text-gray-600 text-3xl font-bold">No favorite recipes found.</p>
            )}
        </div>
    );
};

export default FavoriteRecipesPage;
