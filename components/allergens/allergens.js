import React from 'react';
import HandleError from '../error/Error';

function RecipeAllergens(props) {
  const { allergens, ingredients } = props;

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
        <span>
          <HandleError>
          <strong>Notice:</strong> The following allergens are found in the recipe's ingredients: <strong>{allergensFound.join(', ')}</strong>.
          </HandleError>
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
