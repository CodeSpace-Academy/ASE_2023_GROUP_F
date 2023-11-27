import React, { useState } from 'react';
import { Card, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function Instructions(props) {
  const { recipeId, instructions, userName } = props;
  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedInstructions, setEditedInstructions] = useState([...instructions]);
  const [modifiedInstructions, setModifiedInstructions] = useState({});

  const handleEdit = (index) => {
    setEditableIndex(index);
  };

  const handleSave = async () => {
    try {
      const currentDate = new Date();
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      const formattedDate = currentDate.toLocaleDateString(undefined, options);

      const updatedInstructions = editedInstructions.map((instruction, index) => {
        if (modifiedInstructions[index]) {
          return `${instruction} (edited by ${userName} on ${formattedDate})`;
        }
        return instruction;
      });

      // Update the instruction locally before making the API call
      setEditedInstructions(updatedInstructions);
      setEditableIndex(-1); // Reset editable index after saving

      // Make the API call to update the instruction in the database
      const response = await fetch(`/api/updateRecipe/${recipeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructions: updatedInstructions }),
      });

      if (response.ok) {
        console.log('Recipe updated successfully');
      } else {
        console.error('Failed to update the recipe');
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleInputChange = (index, value) => {
    const modifiedInstructionsCopy = { ...modifiedInstructions };
    modifiedInstructionsCopy[index] = true;
    setModifiedInstructions(modifiedInstructionsCopy);

    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = value;
    setEditedInstructions(updatedInstructions);
  };
  const handleCancel = () => {
    setEditedInstructions([...instructions]);
    setModifiedInstructions({});
    setEditableIndex(-1);
  };

  return (
    <div>
      <div className="overflow-y-auto mx-10 rounded-xl">
        {instructions.map((item, index) => (
          <Card key={`${recipeId}_${+index}`} className="m-0 p-2 bg-gray-200 text-lg">
            {editableIndex === index ? (
              <div>
                <TextField
                  multiline
                  value={editedInstructions[index]}
                  fullWidth
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <div className="text-center m-5">
                  <Button value="start_cooking" variant="outlined" onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center">
                <div className="mr-2">{index + 1}</div>
                <div>{editedInstructions[index]}</div>
                <IconButton size="small" onClick={() => handleEdit(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Instructions;
