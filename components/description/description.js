import React, { useState } from 'react'
import Link from 'next/link'
import { Card, Button, TextField } from '@mui/material'

function Description(props) {
  const { recipeId, description, userName } = props
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)
  const [originalDescription, setOriginalDescription] = useState(description)

  const handleEdit = () => {
    setOriginalDescription(editedDescription);
    setIsEditing(true);
  }

  const handleSave = async () => {
    const currentDate = new Date()
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    const formattedDate = currentDate.toLocaleDateString(undefined, options)

    const updatedDescription = `${editedDescription} (edited by ${userName} on ${formattedDate})`

    try {
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
    setIsEditing(false);
    setEditedDescription(originalDescription); 
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
            <div >
              <p className="text-xl m-1">
                {editedDescription}
                <br/>
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
