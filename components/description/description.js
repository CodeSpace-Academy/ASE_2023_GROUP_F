import React, { useState } from "react";
import Link from "next/link";
import { Card, Button, TextField } from "@mui/material";

function Description(props) {
  const { recipeId, description, userName } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

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

  return (
    <div>
      <div className="overflow-y-auto">
        <Card className="">
          {isEditing ? (
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
              <p>{editedDescription}</p>
              <Button className="mb-5" variant="outlined" onClick={handleEdit}>
                Edit Description
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Description;
