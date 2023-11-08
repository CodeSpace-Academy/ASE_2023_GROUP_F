import React, { useState, useEffect } from 'react';
import RecipeList from '@/components/recipe-collection/RecipeList';
import CardSkeleton from '@/components/skeletonCard/skeleton';
import { getFavoriteRecipes } from '@/lib/view-recipes';

const FavoriteRecipesPage = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteRecipesCount , setFavoriteRecipesCount] = useState(0)

    

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            try {
                const recipes = await getFavoriteRecipes();
              
                setFavoriteRecipes(recipes.favoriteRecipes);
                setFavoriteRecipesCount(recipes.count);
            } catch (error) {
                console.error('Error fetching favorite recipes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteRecipes();
    }, []);


    if (!favoriteRecipes) {
        return <CardSkeleton/>;
    }


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Favorite Recipes ({favoriteRecipesCount})</h1>
            {isLoading ? (
                <CardSkeleton />
            ) : favoriteRecipes?.length > 0 ? (
                <RecipeList visibleRecipes={favoriteRecipes} />
            ) : (
                <p className="text-gray-600 text-3xl font-bold">No favorite recipes found.</p>
            )}
        </div>
    );
    
};

export default FavoriteRecipesPage;