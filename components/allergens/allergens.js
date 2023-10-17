import React from 'react';

function RecipeAllergens(props) {
  const { allergens } = props;

  return (
    <div>
      <ul>
        {allergens.map((allergen) => (
          <li key={allergen}>{allergen}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeAllergens;
