import React from 'react';
import HandleError from '../error/Error';

/**
 * RecipeAllergens Component
 * 
 * This component displays information about allergens found in a recipe's ingredients.
 * It takes two props:
 * 
 * @param {Array} allergens - An array of allergens to check for in the ingredients.
 * @param {Object} ingredients - An object representing the ingredients of the recipe.
 * 
 * The component performs a case-insensitive check to find if any allergens are present
 * in the provided ingredients. It then renders a notice about the allergens found or
 * indicates that no allergens were found.
 * 
 * @returns {JSX.Element} - A React functional component.
 */

function RecipeAllergens(props) {
  const { allergens, ingredients } = props;

  // Function to find allergens in ingredients
  const allergensInIngredients = () => {
    const allergensArr = allergens
    const allergensFound = [];

    allergensArr.map((allergen) => {
      const foundInIngredients = Object.keys(ingredients).some((ingredientKey) =>
        ingredientKey.toLowerCase().includes(allergen.toLowerCase())
      );

      if (foundInIngredients) {
        allergensFound.push(allergen);
      }
    });

    return allergensFound;
  };

  const allergensFound = allergensInIngredients();

  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded-lg mb-4">
      <p>
        {allergensFound.length > 0 ? (
          <span className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 my-4 rounded-md">
            <strong>Notice:</strong> The following allergens are found in the recipe's ingredients: <strong>{allergensFound.join(', ')}</strong>.
          </span>
        ) : (
          <span>
            <HandleError>
              No allergens found in the ingredients.
            </HandleError>
          </span>
        )}
      </p>
    </div>

  );
}

export default RecipeAllergens;
