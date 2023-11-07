import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import HandleError from '../error/Error';

function RecipeTags(props) {
  const { tags, networkError } = props;

  if (networkError) {
    return (
      <div>
        <HandleError errorType="tags" />
      </div>
    );
  }

  if (!tags) {
    return <div>
      <HandleError>
        No errors found
      </HandleError>
    </div>;
  }

  return (
    <div>
      <ul className="list-none p-0 animate-slideRight">
        {tags.map((tag) => (
          <li
            key={tag}
            className="inline-block m-2 bg-gray-200 rounded-md px-4 py-2"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeTags;
