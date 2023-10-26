import React, { useState } from 'react'
import classes from './modal.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function Modal(props) {
  const { handleClose, applyFilters } = props
  const [categories, setCategories] = useState('')
  const [tags, setTags] = useState('')
  const [instructionsFilter, setInstructionsFilter] = useState(10)
  const [ingredients, setIngredients] = useState('')

  const applyFiltersAndCloseModal = () => {
    const appliedFilters = {
      categories: categoriesArray,
      tags: tagsArray,
      ingredients: ingredientsArray,
      instructionsFilter: instructionsFilter,
    }

    applyFilters(appliedFilters)
    handleClose()
  }

  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value)
  }

  const handleCategoriesChange = (event) => {
    setCategories(event.target.value)
  }

  const handleTagsChange = (event) => {
    setTags(event.target.value)
  }

  const clearAllFilters = () => {
    setCategories('')
    setTags('')
    setIngredients('')
    setInstructionsFilter(10)
  }

  const ingredientsArray = ingredients.split(',').map((item) => item.trim())
  const categoriesArray = categories.split(',').map((item) => item.trim())
  const tagsArray = tags.split(',').map((item) => item.trim())

  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        <span className={classes.closeButton} onClick={handleClose}>
          &times;
        </span>

        <div>
          <h2>Filter</h2>
          <div>
            <TextField
              id="outlined-basic"
              label="Categories"
              variant="outlined"
              value={categories}
              onChange={handleCategoriesChange}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Tags"
              variant="outlined"
              value={tags}
              onChange={handleTagsChange}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Ingredients"
              variant="outlined"
              value={ingredients}
              onChange={handleIngredientsChange}
            />
          </div>

          <h4>Number of Instructions:</h4>
          <TextField
            type="number"
            value={instructionsFilter}
            onChange={(e) =>
              setInstructionsFilter(Math.max(1, parseInt(e.target.value)))
            }
          />
          <br />
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            className={classes.clearButton}
            onClick={clearAllFilters}
          >
            Clear All Filters
          </Button>
          <br />
          <Button
            id="applyFilterSort"
            color="secondary"
            size="small"
            variant="outlined"
            onClick={applyFiltersAndCloseModal}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
