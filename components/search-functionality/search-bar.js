import React, { useState, useEffect, useContext } from 'react'

import { Chip, Button, InputLabel, FormControl, Select } from '@mui/material'
import { debounce } from 'lodash'
import Modal from './Modal'
import {filterContext, FilterProvider} from './filterContext';

const SearchBar = ({ applyFilters, setAppliedFilters, appliedFilters }) => {
  const [open, setOpen] = useState(false)
  const [noFiltersApplied, setNoFiltersApplied] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [updateAppliedFilter, setUpdateAppliedfilter] = useState({
    category: [],
    tags: [],
    ingredients: [],
    instructions: null,
  })

  ////////////////////////////////////////////////////////
  const { filters, setFilters } = useContext(filterContext);
  console.log("filters from useContext",filters)

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
    console.log('Applied filters',filters)
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
    updatedFilters[filterType] = updatedFilters[filterType].filter(
      (item) => item !== filterValue
    )
    setSelectedFilters(updatedFilters)
    setUpdateAppliedfilter(updatedFilters) // Update the state

    // Call applyFilters with the updated filters
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
      <label htmlFor="search" />
      <input
        type="text"
        id="search"
        placeholder="Search...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
        <h2>Applied Filters:</h2>
        {Array.isArray(selectedFilters.category) &&
          selectedFilters.category.map((filter, index) => (
            <Chip
              key={index}
              label={filter}
              onDelete={() => handleDelete('category', filter)}
            />
          ))}

        {selectedFilters.tags.map((filter, index) => (
          <Chip
            key={index}
            label={filter}
            onDelete={() => handleDelete('tags', filter)}
          />
        ))}
        {Array.isArray(selectedFilters.ingredients) &&
          selectedFilters.ingredients.map((filter, index) => (
            <Chip
              key={index}
              label={filter}
              onDelete={() => handleDelete('ingredients', filter)}
            />
          ))}
        {selectedFilters.instructions !== null && (
          <Chip
            label={selectedFilters.instructions}
            onDelete={() =>
              handleDelete('instructions', selectedFilters.instructions)
            }
          />
        )}
      </div>
      {noFiltersApplied && <p>No filters have been applied.</p>}
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
