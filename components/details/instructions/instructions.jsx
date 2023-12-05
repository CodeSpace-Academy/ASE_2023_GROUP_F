import React, { useState } from 'react';
import { Card, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

/**
 * Instructions Component
 * @param {Object} props - Component properties
 * @param {string} props.recipeId - The unique identifier for the recipe.
 * @param {Array} props.instructions - An array of strings representing the recipe instructions.
 * @param {string} props.userName - The name of the user interacting with the component.
 * 
 * @returns {JSX.Element} Instructions component
 */

function Instructions(props) {
  const { recipeId, instructions } = props;

  // State variables to manage editing functionality
  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedInstructions, setEditedInstructions] = useState([...instructions]);
  const [modifiedInstructions, setModifiedInstructions] = useState({});

  // State variable for showing additional instructions
  const [showAllInstructions, setShowAllInstructions] = useState(false);

  // Instructions to display based on showAllInstructions state
  const displayedInstructions = showAllInstructions ? editedInstructions : editedInstructions.slice(0, 5);

  /**
   * Handles the edit button click by setting the editable index.
   * @param {number} index - The index of the instruction being edited.
   */
  const handleEdit = (index) => {
    setEditableIndex(index);
  }

  const handleSave = async () => {
    try {
      // Create updated instructions with edit history (code for saving changes)
      const updatedInstructions = editedInstructions.map((instruction, index) => {
        if (modifiedInstructions[index]) {
          return `${instruction} (edited)`;
        }
        return instruction;
      });

      // Update the instruction locally before making the API call
      setEditedInstructions(updatedInstructions);
      setEditableIndex(-1); // Reset editable index after saving

      // Make the API call to update the instruction in the database (code for API call)
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  }

  /**
   * Handles input change for the edited instructions.
   * @param {string} value - The new value of the instruction.
   */
  const handleInputChange = (index, value) => {
    const modifiedInstructionsCopy = { ...modifiedInstructions };
    modifiedInstructionsCopy[index] = true;
    setModifiedInstructions(modifiedInstructionsCopy);

    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = value;
    setEditedInstructions(updatedInstructions);
  }

  const handleCancel = () => {
    setEditedInstructions([...instructions]);
    setModifiedInstructions({});
    setEditableIndex(-1);
  }

  const handleShowMore = () => {
    setShowAllInstructions(!showAllInstructions);
  }

  return (
    <div>
      <div className="overflow-y-auto mx-10 rounded-xl">
        {displayedInstructions.map((item, index) => (
          <Card key={index} className="m-0 p-2 bg-gray-200 lg:text-lg md:text-sm">
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
                    variant="outlined"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center">
                <div className="mr-2">{index + 1}</div>
                <div>{item}</div>
                <IconButton size="small" onClick={() => handleEdit(index)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </div>
            )}
          </Card>
        ))}
        {instructions.length > 2 && (
          <div className="flex justify-center mt-2">
            <Button
              variant="outlined"
              onClick={handleShowMore}
            >
              {showAllInstructions ? '▲' : '▼'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Instructions;
