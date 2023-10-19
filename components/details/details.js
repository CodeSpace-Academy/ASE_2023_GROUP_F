import Ingredients from './ingredients/ingredients'
import Instructions from './instructions/instructions'
import Description from './description/description'
import { useState } from 'react'

import { ToggleButton } from '@mui/material'

function Details(props) {
  const { recipe } = props

  const [toggleList, setToggleList] = useState('ingredients')
  const [error, setError] = useState(false)

  function toggleInstructions() {
    setToggleList('instructions')
  }

  function toggleIngredients() {
    setToggleList('ingredients')
  }

  return (
    <>
      <Description
        description={recipe.description}
        title={recipe.title}
        nutrition={recipe.nutrition}
        prepTime={recipe.prep}
      />

      <ToggleButton value="ingredients" onClick={toggleIngredients}>
        Ingredients
      </ToggleButton>
      <ToggleButton value="instructions" onClick={toggleInstructions}>
        Instructions
      </ToggleButton>

      {toggleList === 'ingredients' && !error && (
        <Ingredients ingredients={recipe.ingredients} />
      )}

      {toggleList === 'instructions' && !error && (
        <Instructions
          instructions={recipe.instructions}
          recipeId={recipe._id}
        />
      )}
    </>
  )
}

export default Details
