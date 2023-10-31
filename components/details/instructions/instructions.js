import React, { useState, useEffect } from 'react'
import { Card, Button, TextField } from '@mui/material'

function Instructions(props) {
  const { recipeId, instructions, userName } = props
  const [editableIndex, setEditableIndex] = useState(-1)
  const [editedInstructions, setEditedInstructions] = useState([
    ...instructions,
  ])
  const [modifiedInstructions, setModifiedInstructions] = useState({})

  const handleEdit = (index) => {
    setEditableIndex(index)
  }

  const handleSave = async () => {
    try {
      const currentDate = new Date()
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
      const formattedDate = currentDate.toLocaleDateString(undefined, options)

      const updatedInstructions = editedInstructions.map(
        (instruction, index) => {
          if (modifiedInstructions[index]) {
            return `${instruction} (edited by ${userName} on ${formattedDate})`
          }
          return instruction
        }
      )

      const response = await fetch(`/api/updateRecipe/${recipeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructions: updatedInstructions }),
      })

      if (response.ok) {
        console.log('Recipe updated successfully')
      } else {
        console.error('Failed to update the recipe')
      }
    } catch (error) {
      console.error('Error updating recipe:', error)
    }
  }

  const handleInputChange = (index, value) => {
    const modifiedInstructionsCopy = { ...modifiedInstructions }
    modifiedInstructionsCopy[index] = true
    setModifiedInstructions(modifiedInstructionsCopy)

    const updatedInstructions = [...editedInstructions]
    updatedInstructions[index] = value
    setEditedInstructions(updatedInstructions)
  }

  return (
    <div>
      <div className=" overflow-y-auto">
        {instructions.map((item, index) => (
          <Card key={index} className="m-8 p-8">
            {editableIndex === index ? (
              <div>
                <TextField
                  multiline
                  value={editedInstructions[index]}
                  fullWidth
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <div className="text-center m-5">
                  <Button
                    value="start_cooking"
                    variant="outlined"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div onClick={() => handleEdit(index)}>
                {index + 1}: {editedInstructions[index]}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Instructions
