import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

function RecipeTags(props) {
  const { tags } = props;

  if (!tags) {
    return <div>No tags available</div>;
  }

  return (
    <div>
      <ToggleButtonGroup>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default RecipeTags;