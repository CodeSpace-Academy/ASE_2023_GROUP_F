import React from 'react'
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
