import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button, TextField } from "@mui/material";
import HandleNetworkError from '../network-error/NetworkError';

function Description(props) {
  const { recipeId, description, userName} = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [networkError, setNetworkError] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const currentDate = new Date();
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
  
    const updatedDescription = `${editedDescription} (edited by ${userName} on ${formattedDate})`;
  
    try {
      const response = await fetch(`/api/updateRecipe/${recipeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: updatedDescription }),
      });
      
  
      if (response.ok) {
        console.log("Description updated successfully");
        setIsEditing(false);
      } else {
        console.error("Failed to update the description");
      }
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };
  
  useEffect(() => {
    
    const hasNetworkError = false;

    if (hasNetworkError) {
      setNetworkError(true);
    }
  }, []);


  return (
<div>
  <div className="bg-green-500 h-96 overflow-y-auto">
    <Card className="m-8 p-8">
      {networkError ? ( // Check for network error
        <div>
          <HandleNetworkError errorType="description" />
        </div>
      ) : (
        // Content to display when there's no network error
        isEditing ? (
          <div>
            <TextField
              multiline
              value={editedDescription}
              fullWidth
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <Button variant="outlined" onClick={handleSave}>
              Save
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-xl m-10">{editedDescription}</p>
            <Button variant="outlined" onClick={handleEdit}>
              Edit Description
            </Button>
          </div>
        )
      )}
    </Card>
  </div>
</div>
  );
}

export default Description;
