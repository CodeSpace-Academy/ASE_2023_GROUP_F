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
 **/

import React from 'react';
import { ToggleButton, Card, Button } from '@mui/material'

function Ingredients(props) {
  const { ingredients } = props
  let ingredient = Object.entries(ingredients)

  return (
    <div>
      <div className="mx-10 rounded-xl">
        {ingredient.map((item, index) => (
          <Card key={index} className="p-2 bg-gray-200 text-lg">
              {item[0]}: {item[1]}
          </Card>
        ))}
        <div className="text-center">
          <br/>
          <br/>
          <br/>
          <Button value="add_to_cart" variant="outlined">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Ingredients
