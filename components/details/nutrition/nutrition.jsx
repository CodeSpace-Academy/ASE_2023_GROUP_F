import React from 'react';
import { Card } from '@mui/material';

function Nutrition({ nutritionList }) {
  const nutrition = Object.entries(nutritionList);

  return (
    <div className=" overflow-y-auto flex flex-row rounded-xl">
      {nutrition.map(([key, value]) => (
        <Card key={key} sx={{ margin: 0.5, padding: 1 }}>
          <div>
            {key}:{value}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Nutrition;
