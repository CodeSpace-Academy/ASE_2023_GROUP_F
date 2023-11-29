import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import HandleError from '../error/Error'

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
 **/

function RecipeTags(props) {
  const { tags, networkError } = props

    // Render error message if a network error occurs
  if (networkError) {
    return (
      <div>
        <HandleError errorType="tags" />
      </div>
    )
  }

  if (!tags) {
    return (
      <div>
        <HandleError>No tags found</HandleError>
      </div>
    )
  }

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
  )
}

export default RecipeTags
