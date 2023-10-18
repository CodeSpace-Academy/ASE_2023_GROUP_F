import React from 'react';

function RecipeAllergens(props) {
  const { allergens, ingredients } = props;

  // Initialize an array to store allergens found
  const allergensFound = [];

  // Ensure allergens is iterable
  if (allergens && typeof allergens[Symbol.iterator] === 'function') {
    allergens.forEach((allergen) => {
      console.log('hdtr',allergen)
      if (ingredients.hasOwnProperty(allergen)) {
        // If the allergen is a key in the ingredients object
        allergensFound.push(allergen);
        
      }
    });
  }

 

  if (allergensFound.length === 0) {
    return (
      <div>
        <p>No allergens found in the ingredients.</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {allergensFound.map((allergen) => (
          <li key={allergen}>{allergen}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeAllergens;
