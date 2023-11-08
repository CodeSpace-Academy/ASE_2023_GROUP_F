import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

function RecipeTags(props) {
  const { tags } = props

  if (!tags) {
    return <div>No tags available</div>
  }

  return (
    <div>
      <ul className="list-none p-0 animate-slideRight">
        {tags.map((tag) => (
          <li key={tag} className="inline-block m-2 text-blue-500">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipeTags
