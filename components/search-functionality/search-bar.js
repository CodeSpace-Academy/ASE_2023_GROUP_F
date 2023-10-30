import React, { useState } from 'react'

import { Chip, Button, InputLabel, FormControl, Select } from '@mui/material'

import Modal from './Modal'

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

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters)
  }

  // Function to handle filter deletion
  const handleDeleteFilter = (filterName, filterValue) => {
    setAppliedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: prevFilters[filterName].filter(
        (value) => value !== filterValue
      ),
    }))
  }

  return (
    <div>
      <div>
        <label htmlFor="search" />
        <input
          type="text"
          id="search"
          placeholder="Search...."
          style={{ marginBottom: '1rem' }}
        />

        <Button
          style={{
            fontSize: '16px',
            margin: '1rem',
            minWidth: 120,
            // display: 'block',
          }}
          variant="outlined"
          size="large"
          onClick={handleOpen}
        >
          Filters
        </Button>

        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          style={{
            // display: 'block',
            marginBottom: '1rem',
          }}
        >
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
      </div>

      {open && (
        <Modal handleClose={handleClose} applyFilters={handleApplyFilters} />
      )}

      <div>
        <h2>Applied Filters:</h2>
        {Object.entries(appliedFilters).map(
          ([filterName, filterValues]) =>
            filterName !== 'instructionsFilter' &&
            Array.isArray(filterValues) &&
            filterValues.length > 0 && (
              <div key={filterName}>
                <strong>{filterName}:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {filterValues.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() => handleDeleteFilter(filterName, value)}
                    />
                  ))}
                </div>
              </div>
            )
        )}

        {appliedFilters.instructionsFilter !== null && (
          <div>
            <strong>Instructions Filter:</strong>
            <Chip
              label={appliedFilters.instructionsFilter}
              onDelete={() =>
                setAppliedFilters((prevFilters) => ({
                  ...prevFilters,
                  instructionsFilter: null,
                }))
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
