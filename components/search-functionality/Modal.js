import React, { useState } from 'react'
import classes from './modal.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function Modal(props) {
  const { handleClose, applyFilters, searchTerm } = props
  const [categories, setCategories] = useState('')
  const [tags, setTags] = useState('')
  const [instructionsFilter, setInstructionsFilter] = useState(null)
  const [ingredients, setIngredients] = useState('')

  const applyFiltersAndCloseModal = async () => {
    const appliedFilters = {
      category: Array.isArray(categories)
        ? categories
        : categories
        ? categories.split(',').map((categories) => categories.trim())
        : [],
      tags: Array.isArray(tags)
        ? tags
        : tags
        ? tags.split(',').map((tag) => tag.trim())
        : [],
      ingredients: Array.isArray(ingredients)
        ? ingredients
        : ingredients
        ? ingredients.split(',').map((ingredient) => ingredient.trim())
        : [],
      instructions:
        instructionsFilter !== null ? instructionsFilter : instructionsFilter,
      title: searchTerm,
      isFavorite: true,
    }

    await applyFilters(appliedFilters)
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

  const handleInstructionChange = (event) => {
    setInstructionsFilter(Math.max(1, parseInt(event.target.value)))
  }

  const clearAllFilters = () => {
    setCategories('')
    setTags('')
    setIngredients('')
    setInstructionsFilter('')
  }

  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        <span className={classes.closeButton} onClick={handleClose}>
          &times;
        </span>

        <div>
          <h2 className="mb-2 mr-5 font-bold">Filter</h2>
          <div>
            <TextField
              className="mb-2 "
              id="outlined-basic"
              label="Categories"
              variant="outlined"
              value={categories}
              onChange={handleCategoriesChange}
            />
            <br />
            <TextField
              className="mb-2 "
              id="outlined-basic"
              label="Tags"
              variant="outlined"
              value={tags}
              onChange={handleTagsChange}
            />
            <br />
            <TextField
              className="mb-2"
              id="outlined-basic"
              label="Ingredients"
              variant="outlined"
              value={ingredients}
              onChange={handleIngredientsChange}
            />
          </div>

          <h4 className="font-bold">Number of Instructions:</h4>
          <TextField
            className="mb-2 mt-1"
            type="number"
            value={instructionsFilter}
            onChange={handleInstructionChange}
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
            className="mt-2"
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
