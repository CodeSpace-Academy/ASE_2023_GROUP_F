import React, { useContext, useEffect, useState } from 'react'
import classes from './modal.module.css'
import TextField from '@mui/material/TextField'
import { Autocomplete } from '@mui/material'
import Button from '@mui/material/Button'
import { filterContext } from './filterContext'
import { getCategories } from '@/lib/view-recipes'

function Modal(props) {
  const { handleClose, applyFilters } = props
  const [tags, setTags] = useState([])
  const [tagOptions, setTagOptions] = useState([])
  const { filters, setFilters } = useContext(filterContext)

  useEffect(() => {
    const fetchTags = async () => {
      const result = await getCategories()
      const fetchedTags = result.categories[0].categories
      if (Array.isArray(fetchedTags)) {
        setTags(fetchedTags)
      }
    }

    fetchTags()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const data = Object.fromEntries(form)

    if (data.tags) {
      data.tags = data.tags.split(',').map((tag) => tag.trim())
    } else {
      data.tags = []
    }
    data.tags = tagOptions
    await applyFilters(data)
    handleClose()
  }

  const clearAllFilters = () => {
    setFilters({
      categories: '',
      tags: '',
      instructions: null,
      ingredients: '',
    })
    setTagOptions([])
  }

  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        <div>
          <p style={{ margin: '0', fontWeight: '500' }}>Filters</p>
          <span className={classes.closeButton} onClick={handleClose}>
            &times;
          </span>
          <hr
            style={{
              margin: '0 auto',
              marginTop: '10px',
              marginBottom: '15px',
              width: '100%',
              border: '0',
              height: '1px',
              background:
                'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
            }}
          />
        </div>
        <form onSubmit={handleSubmit} id="form">
          <div>
            <TextField
              className={classes.form}
              id="outlined-basic"
              label="Select"
              variant="outlined"
              name="category"
              value={filters.category}
            />
            <br />

            <Autocomplete
              className={classes.form}
              multiple
              id="tags"
              options={tags}
              getOptionLabel={(option) => option}
              value={tagOptions}
              onChange={(event, newValue) => {
                if (newValue !== undefined && Array.isArray(newValue)) {
                  setTagOptions(newValue)
                } else {
                  setTagOptions([])
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select" variant="outlined" />
              )}
            />

            <TextField
              className={classes.form}
              id="outlined-basic"
              label="Select"
              variant="outlined"
              name="ingredients"
              value={filters.ingredients}
            />
          </div>

          <p
            style={{
              fontSize: '14px,',
            }}
          >
            Number of Instructions
          </p>
          <TextField
            className={classes.form}
            type="number"
            name="instructions"
            value={filters.instructions}
          />
          <br />
          <button
            className="hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none 
			focus:ring-gray-300 font-medium rounded-lg text-lg px-5 text-center mr-3 mt-2 dark:border-gray-600 dark:text-blue-950 
			dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            variant="outlined"
            onClick={clearAllFilters}
          >
            Clear All Filters
          </button>
          <button
            className="hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 
			font-medium rounded-lg text-lg px-5 text-center mr-3 mt-2 dark:border-gray-600 dark:text-blue-950 dark:hover:text-white 
			dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            form="form"
            id="applyFilterSort"
            type="submit"
            variant="outlined"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  )
}

export default Modal
