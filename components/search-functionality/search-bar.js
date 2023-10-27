import React, { useState } from 'react'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Modal from './Modal'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import { getViewRecipes } from '@/lib/view-recipes'

const PAGE_SIZE = 48

const SearchBar = () => {
  const [open, setOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    tags: [],
    ingredients: [],
    instructionsFilter: null,
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleApplyFilters =async (filters) => {
    setAppliedFilters(filters)

    const filtering = await getViewRecipes(0 , PAGE_SIZE , filters)
  }

  const handleDelete = (filterType, filterValue) => {
    const updatedFilters = { ...appliedFilters }
    updatedFilters[filterType] = updatedFilters[filterType].filter(
      (item) => item !== filterValue
    )
    setAppliedFilters(updatedFilters)
  }

  const renderFilter = (name, value) => {
    if (value && value.length > 0) {
      return (
        <div key={name}>
          <strong>{name}: </strong>
          <Stack direction="row" spacing={1}>
            {value.map((filter, index) => (
              <Chip
                key={index}
                label={filter}
                onDelete={() => handleDelete(name.toLowerCase(), filter)}
              />
            ))}
          </Stack>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <label htmlFor="search" />
      <input type="text" id="search" placeholder="Search...." />

      <Button variant="outlined" size="large" onClick={handleOpen}>
        Filters
      </Button>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-native-select">Sort By</InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          label="Grouping"
        >
          <option aria-label="None" value="" />
          <optgroup label="Prep Time">
            <option value={1}>Prep ASC</option>
            <option value={2}>Prep DESC</option>
          </optgroup>
          <optgroup label="Cook Time">
            <option value={3}>Cook ASC</option>
            <option value={4}>Cook DESC</option>
          </optgroup>
          <optgroup label="Date Created">
            <option value={3}>Date ASC</option>
            <option value={4}>Date DESC</option>
          </optgroup>
        </Select>
      </FormControl>

      {open && (
        <Modal handleClose={handleClose} applyFilters={handleApplyFilters} />
      )}

      <div>
        <h2>Applied Filters:</h2>
        {renderFilter('Categories', appliedFilters.categories)}
        {renderFilter('Tags', appliedFilters.tags)}
        {renderFilter('Ingredients', appliedFilters.ingredients)}
        {appliedFilters.instructionsFilter !== null && (
          <div>
            <strong>Instructions Filter: </strong>
            <Chip
              label={appliedFilters.instructionsFilter.toString()}
              onDelete={() =>
                handleDelete(
                  'instructionsfilter',
                  appliedFilters.instructionsFilter
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
