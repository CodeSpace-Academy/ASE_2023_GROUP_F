import React from "react";

import HandleError from "../error/Error";

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
    return (
      <div>
        <HandleError>No tags found</HandleError>
      </div>
    );
  }

  return (
    <div>
      <ul className="list-none p-0 animate-slideRight">
        {tags.map((tag) => (
          <li
            key={tag}
            className="inline-block p-2 m-2 text-black-500  bg-gray-200 rounded-xl"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeTags;
