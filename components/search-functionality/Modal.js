import React, { useState } from 'react'
import classes from './modal.module.css'

import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function Modal(props) {
  const { handleClose, applyFilters } = props
  const [categories, setCategories] = useState('')
  const [tags, setTags] = useState('')
  const [instructionsFilter, setInstructionsFilter] = useState(10)
  const [ingredients, setIngredients] = useState('')

  //
  const applyFiltersAndCloseModal = () => {
    const appliedFilters = {
      categories: categoriesArray,
      tags: tagsArray,
      ingredients: ingredientsArray,
      instructionsFilter: instructionsFilter,
    }

    applyFilters(appliedFilters) // Pass the applied filters to the parent
    handleClose()
  }
  //keeps the state and the displayed value of the text field in sync
  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value)
  }
  const handleCategoriesChange = (event) => {
    setCategories(event.target.value)
  }
  const handleTagsChange = (event) => {
    setTags(event.target.value)
  }
  function valuetext(value) {
    return `${value}`
  }

  //defaultValues
  const clearAllFilters = () => {
    setCategories('')
    setTags('')
    setIngredients('')
    setInstructionsFilter(10)
  }
  // array containing individual values
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
            <br />
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIngredients('')}
            >
              Clear Ingredients
            </Button>
          </div>

          <h4>Number of Instrutions:</h4>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Custom marks"
              size="large"
              value={instructionsFilter}
              onChange={(e, newValue) => setInstructionsFilter(newValue)}
              getAriaValueText={valuetext}
              step={1}
              valueLabelDisplay="auto"
            />
          </Box>

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
