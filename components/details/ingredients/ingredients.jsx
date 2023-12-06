import React, { useState } from 'react';
import { Card } from '@mui/material';

/**
 * Ingredients Component
 *
 * This component displays a list of ingredients in a card format. Each ingredient
 * is represented as a key-value pair from the provided ingredients object.
 * Additionally, it includes a button to add the ingredients to the cart.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.ingredients - An object representing the ingredients, where keys are ingredient names and values are quantities.
 * @returns {JSX.Element} - The rendered Ingredients component.
 *
 * */

function Ingredients(props) {
  const { ingredients } = props;
  const [showAll, setShowAll] = useState(false);

  const ingredient = Object.entries(ingredients);
  const visibleIngredients = showAll ? ingredient : ingredient.slice(0, 5);

  return (
    <div>
      <div className="mx-4 rounded-xl">
        {visibleIngredients.map((item) => (
          <Card key={item} className="p-2 bg-gray-200 lg:text-lg md:text-sm">
            {item[0]}: {item[1]}
          </Card>
        ))}
        {ingredients.length > 3 && (
          <div className="flex justify-center mt-2">
            {showAll ? <div onClick={() => setShowAll(false)}>▲</div> : <div onClick={() => setShowAll(true)}>▼</div>}
          </div>
        )}
      </div>
    </div>
  );
}
export default Ingredients;
