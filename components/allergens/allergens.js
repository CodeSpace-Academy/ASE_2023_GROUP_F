import React from 'react';

function RecipeAllergens(props) {
  const { allergens, ingredients } = props;

  const allergensInIngredients = () => {
    const allergensArr = allergens[0].allergens
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
    <div>
      <p>
        {allergensFound.length > 0 ? (
          <span>
            <strong>Notice:</strong> The following allergens are found in the recipe's ingredients: {allergensFound.join(', ')}.
          </span>
        ) : (
          <span>No allergens found in the ingredients.</span>
        )}
      </p>
    </div>
  );
}

export default RecipeAllergens;
