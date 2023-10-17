import React from 'react';

function RecipeAllergens(props) {
  const { allergens, ingredients } = props;

  const allergensInIngredients = () => {
    const allergensFound = [];

    for (const allergen of allergens) {
      for (const ingredientKey in ingredients) {
        if (ingredients.hasOwnProperty(ingredientKey)) {
          const ingredient = ingredients[ingredientKey];

          if (ingredient.toLowerCase().includes(allergen.toLowerCase())) {
            allergensFound.push(allergen);
            break;
          }
        }
      }
    }

    return allergensFound;
  };

  const allergensFound = allergensInIngredients();

  return (
    <div>
      <h3>Allergens Found:</h3>
      {allergensFound.length > 0 ? (
        <ul>
          {allergensFound.map((allergen) => (
            <li key={allergen}>{allergen}</li>
          ))}
        </ul>
      ) : (
        <p>No allergens found in the ingredients.</p>
      )}
    </div>
  );
}

export default RecipeAllergens;
