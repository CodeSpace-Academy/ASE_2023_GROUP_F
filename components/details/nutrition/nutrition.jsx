import React, { useState } from 'react';
import { Card, Button } from '@mui/material';

/**
 * Nutrition Component
 *
 * @param {Object} props - Component properties
 * @param {Object} props.nutritionList - An object representing the nutrition information.
 *
 * @returns {JSX.Element} Nutrition component
 */

function Nutrition({ nutritionList }) {
  const [showAll, setShowAll] = useState(false);

  // Convert the object into an array of key-value pairs
  const nutrition = Object.entries(nutritionList);

  const visibleNutrition = showAll ? nutrition : nutrition.slice(0, 3);

  return (
    <div className="flex-row mx-10 overflow-y-auto lg:rounded-xl md:rounded-sm lg:flex">
      {visibleNutrition.map(([key, value]) => (
        <Card sx={{ margin: 0.5, padding: 1 }} key={key}>
          <div>
            {key}: {value}
          </div>
        </Card>
      ))}
      {nutrition.length > 3 && (
        <div className="flex flex-col items-center lg:hidden">
          <Button onClick={() => setShowAll(!showAll)} sx={{ mt: 1 }}>
            {showAll ? '▲' : ' ▼'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Nutrition;
