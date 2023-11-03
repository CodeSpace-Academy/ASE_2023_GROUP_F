import React, { useState, useEffect } from 'react'

import { Chip, Button, InputLabel, FormControl, Select } from '@mui/material'
import { debounce } from 'lodash'
import Modal from './Modal'

const SearchBar = ({ applyFilters, setAppliedFilters, appliedFilters }) => {
  const [open, setOpen] = useState(false)
  const [noFiltersApplied, setNoFiltersApplied] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // const [sortBy, setSortBy] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    tags: [],
    ingredients: [],
    instructions: null,
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleApplyFilters = async (filters) => {
    const nonEmptyFilters = {}
    for (const key in filters) {
      if (
        filters[key] !== null &&
        filters[key] !== '' &&
        filters[key].length > 0
      ) {
        nonEmptyFilters[key] = filters[key]
      }
    }

    if (Object.keys(nonEmptyFilters).length > 0) {
      await applyFilters(nonEmptyFilters)
      setNoFiltersApplied(false) // Filters are applied
    }
    setAppliedFilters(filters)
    setSelectedFilters(filters)
  }

  const handleDelete = (filterType, filterValue) => {
    const updatedFilters = { ...selectedFilters }

    if (Array.isArray(updatedFilters[filterType])) {
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        (item) => item !== filterValue
      )
    } else {
      updatedFilters[filterType] = []
    }

    setSelectedFilters(updatedFilters)

    handleApplyFilters(updatedFilters)
  }

  const handleResetFilters = () => {
    setSelectedFilters({
      category: [],
      tags: [],
      ingredients: [],
      instructions: null,
    })
    applyFilters({})
    setNoFiltersApplied(true) // Filters are cleared
  }

  const handleSortChange = (event) => {}

  useEffect(() => {
    const debouncedApplyFilters = debounce((title) => {
      applyFilters({ title })
    }, 500)

    debouncedApplyFilters(searchTerm)

    return () => {
      debouncedApplyFilters.cancel()
    }
  }, [searchTerm])

  return (
    <div>
      <div className="flex container items-center justify-between">
        <Button
          variant="outlined"
          size="large"
          onClick={handleOpen}
          className="border-gray-800 dark:text-blue-950 hover:text-white border hover:bg-gray-900 rounded-full"
        >
          Filters
        </Button>
        <div className="flex mx-auto gap-80 items-center space-x-5">
          <label htmlFor="search" />
          <input
            className="rounded text-2xl p-2"
            type="text"
            id="search"
            placeholder="Search...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FormControl
            className="border-gray-800 hover:bg-slate-200"
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel htmlFor="grouped-native-select">Sort By</InputLabel>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="Grouping"
              onChange={handleSortChange}
            >
              <option aria-label="None" value="" />
              <optgroup label="Prep Time">
                <option value={1}>Prep ASC</option>
                <option value={-1}>Prep DESC</option>
              </optgroup>
              <optgroup label="Cook Time">
                <option value={1}>Cook ASC</option>
                <option value={-1}>Cook DESC</option>
              </optgroup>
              <optgroup label="Date Created">
                <option value={1}>Date ASC</option>
                <option value={-1}>Date DESC</option>
              </optgroup>
            </Select>
          </FormControl>
        </div>
      </div>

      {open && (
        <Modal
          handleClose={handleClose}
          applyFilters={handleApplyFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          instructions={appliedFilters.instructions}
        />
      )}

      <div>
        <h2 className="font-bold">Applied Filters:</h2>
        {Object.entries(selectedFilters).map(([filterName, filterValues]) =>
          filterName !== 'instructions' &&
          Array.isArray(filterValues) &&
          filterValues.length > 0 ? (
            <div
              key={filterName}
              style={{
                display: 'inline-block',
                marginRight: '1rem',
                maxWidth: 500,
              }}
            >
              <strong>{filterName}:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filterValues.map((value, index) => (
                  <Chip
                    key={index}
                    label={value}
                    onDelete={() => handleDelete(filterName, value)}
                  />
                ))}
              </div>
            </div>
          ) : null
        )}

        {selectedFilters.instructions !== null &&
          selectedFilters.instructions !== '' && (
            <div
              style={{
                display: 'inline-block',
                marginRight: '1rem',
                maxWidth: 500,
              }}
            >
              <strong>Instructions:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Chip
                  label={selectedFilters.instructions}
                  onDelete={() =>
                    setSelectedFilters((prevFilters) => ({
                      ...prevFilters,
                      instructions: null,
                    }))
                  }
                />
              </div>
            </div>
          )}
      </div>

      {noFiltersApplied && (
        <p className="font-light text-blue-950">
          No filters have been applied.
        </p>
      )}

      <Chip
        color="secondary"
        label="Clear All Filters"
        size="small"
        variant="outlined"
        onClick={handleResetFilters}
      />
    </div>
  )
}

export default SearchBar
