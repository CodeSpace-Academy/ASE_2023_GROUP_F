import React, { useState } from 'react'
import { Card, Button, TextField } from '@mui/material'

/**
 * Description Component
 *
 * This component is responsible for displaying and editing the description of a recipe.
 * It includes functionality for editing, saving, and canceling edits, along with updating
 * the description on the server via a PATCH request to the '/api/updateRecipe/:recipeId' endpoint.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.recipeId - The unique identifier of the recipe.
 * @param {string} props.description - The initial description of the recipe.
 * 
 * @returns {JSX.Element} - The rendered Description component.
 *
**/

function Description(props) {
  const { recipeId, description } = props

   // State variables for managing edit state and edited description
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)
  const [originalDescription, setOriginalDescription] = useState(description)

  const handleEdit = () => {
    setOriginalDescription(editedDescription)
    setIsEditing(true)
  }

  const handleSave = async () => {
    const currentDate = new Date()
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    const formattedDate = currentDate.toLocaleDateString(undefined, options)

    // Concatenate information about the edit to the description
    const updatedDescription = `${editedDescription} (edited on ${formattedDate})`
    setEditedDescription(updatedDescription)
    setIsEditing(false)

    try {
      // Make a PATCH request to update the recipe description on the server
      const response = await fetch(`/api/updateRecipe/${recipeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: updatedDescription }),
      })

      if (response.ok) {
        console.log('Description updated successfully')
        setIsEditing(false)
      } else {
        console.error('Failed to update the description')
      }
    } catch (error) {
      console.error('Error updating description:', error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedDescription(originalDescription)
  }

  return (
    <div>
      <div>
        <Card className="bg-gray-200">
          {isEditing ? (
            <div>
              <TextField
                multiline
                value={editedDescription}
                fullWidth
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <div className="flex-row space-x-4">
                <Button variant="outlined" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl m-1">
                {editedDescription}
                <br />
                <Button variant="outlined" onClick={handleEdit}>
                  Edit
                </Button>
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Description
