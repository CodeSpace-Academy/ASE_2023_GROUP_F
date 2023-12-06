import React, { useState } from 'react';
import { Button, TextField, Typography, useMediaQuery } from '@mui/material';

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
 */

function Description(props) {
  const { recipeId, description } = props;

  // State variables for managing edit state and edited description
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [originalDescription, setOriginalDescription] = useState(description);
  const [showRemaining, setShowRemaining] = useState(description.length > 300);

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const handleEdit = () => {
    setOriginalDescription(editedDescription);
    setIsEditing(true);
  };

  const handleSave = async () => {
    const currentDate = new Date();
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    // Concatenate information about the edit to the description
    const updatedDescription = `${editedDescription} (edited on ${formattedDate})`;
    setEditedDescription(updatedDescription);
    setIsEditing(false);

    try {
      // Make a PATCH request to update the recipe description on the server
      const response = await fetch(`/api/updateRecipe/${recipeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: updatedDescription }),
      });

      if (response.ok) {
        console.log('Description updated successfully');
        setIsEditing(false);
      } else {
        console.error('Failed to update the description');
      }
    } catch (error) {
      console.error('Error updating description:', error);
    }

    setShowRemaining(editedDescription.length > 300);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDescription(originalDescription);
    setShowRemaining(originalDescription.length > 300);
  };

  const toggleShowRemaining = () => {
    setShowRemaining(!showRemaining);
  };

  return (
    <div style={{ backgroundColor: '#cbd5e1' }}>
      {isEditing ? (
        <div>
          <TextField
            multiline
            value={editedDescription}
            fullWidth
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div className="flex-row space-x-4 text-center">
            <Button variant="outlined" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          {isSmallScreen && showRemaining ? (
            <div>
              <Typography variant="body1" component="p" className="m-1 text-start">
                {editedDescription.length > 300 ? `${editedDescription.slice(0, 300)}...` : editedDescription}
              </Typography>

              <Button
                variant="text"
                style={{ color: 'black', textDecoration: 'underline', fontWeight: 'bold' }}
                onClick={toggleShowRemaining}
              >
                Show More
              </Button>
            </div>
          ) : (
            <Typography variant="body1" component="p" className="m-1 text-start">
              {editedDescription}
            </Typography>
          )}

          <Button variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}

export default Description;
