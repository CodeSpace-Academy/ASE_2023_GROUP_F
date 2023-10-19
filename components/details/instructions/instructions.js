import classes from './instructions.module.css'
import React, { useState } from 'react'

function Instructions(props) {
  const { instructions, userName, recipeId } = props
  const [editableIndex, setEditableIndex] = useState(-1)
  const [editedInstructions, setEditedInstructions] = useState([
    ...instructions,
  ])

  const handleEdit = (index) => {
    setEditableIndex(index)
  }

  const handleSave = async (index) => {
    const updatedInstructions = [...editedInstructions]
    const currentDate = new Date()
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    const formattedDate = currentDate.toLocaleDateString(undefined, options)

    updatedInstructions[
      index
    ] = `${editedInstructions[index]} (edited by ${userName} on ${formattedDate})`
    setEditableIndex(-1)
    setEditedInstructions(updatedInstructions)
    console.log(recipeId)
    try {
      const response = await fetch(`/api/updateRecipe/${recipeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructions: updatedInstructions[index] }),
      })

      if (response.ok) {
        const updatedRecipeData = await response.json()
        window.alert('Recipe updated successfully')
      } else {
        console.error('Failed to update the recipe')
      }
    } catch (error) {
      console.error('Error updating recipe:', error)
    }
  }

  return (
    <div>
      {instructions.map((item, index) => (
        <div key={index} className={classes.card}>
          <div className={classes.step_number}>{index + 1} </div>
          {editableIndex === index ? (
            <div>
              <textarea
                value={editedInstructions[index]}
                onChange={(e) => {
                  const updatedInstructions = [...editedInstructions]
                  updatedInstructions[index] = e.target.value
                  setEditedInstructions(updatedInstructions)
                }}
              />
              <button onClick={() => handleSave(index)}>Save</button>
            </div>
          ) : (
            <div
              className={classes.instruction}
              onClick={() => handleEdit(index)}
            >
              {editedInstructions[index]}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Instructions
