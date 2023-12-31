import React from 'react';
import NetworkError from '../error/NetworkError';
import HandleError from '../error/Error';

/**
 * RecipeTags Component
 *
 * A React component for displaying a list of recipe tags.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {string[]} props.tags - An array of tags to be displayed.
 * @param {boolean} props.networkError - Indicates whether a network error has occurred.
 *
 * @returns {JSX.Element} The rendered RecipeTags component.
 *
 */

function RecipeTags(props) {
  const { tags, networkError } = props;

  // Render error message if a network error occurs
  if (networkError) {
    return (
      <div>
        <NetworkError errorMessage={networkError} />
      </div>
    );
  }

  // Render message if no tags are found
  if (!tags) {
    return (
      <div>
        <HandleError>No tags found</HandleError>
      </div>
    );
  }

  // Render the list of tags
  return (
    <div>
      <ul className="list-none p-0 animate-slideRight">
        {tags.map((tag) => (
          <li key={tag} className="inline-block p-2 m-2 text-black-500  bg-gray-200 rounded-xl">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeTags;
