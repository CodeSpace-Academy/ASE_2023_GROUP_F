import React, { useState, useEffect, useContext } from "react";
import { Chip, Button, InputLabel, FormControl, Select } from "@mui/material";
import { debounce } from "lodash";
import Modal from "./Modal";
import { filterContext } from "./filterContext";
import HandleError from '../error/Error'

const SearchBar = ({
  applyFilters,
  appliedFilters,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  count,
}) => {
  const [open, setOpen] = useState(false);
  const [noFiltersApplied, setNoFiltersApplied] = useState(true);
  const [updateAppliedFilter, setUpdateAppliedfilter] = useState({
    category: [],
    tags: [],
    ingredients: [],
    instructions: null,
  });

  const { filters } = useContext(filterContext);

  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    tags: [],
    ingredients: [],
    instructions: null,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApplyFilters = async (filters) => {
    const nonEmptyFilters = {};
    for (const key in filters) {
      if (
        filters[key] !== null &&
        filters[key] !== "" &&
        filters[key].length > 0
      ) {
        nonEmptyFilters[key] = filters[key];
      }

      setNoFiltersApplied(false)
    }

    if (Object.keys(nonEmptyFilters).length > 0) {
      await applyFilters(nonEmptyFilters, sortOption);
    }
    setSelectedFilters(filters);
  };
  const handleDelete = (filterType, filterValue) => {
    const updatedFilters = { ...selectedFilters };
    updatedFilters[filterType] = updatedFilters[filterType].filter(
      (item) => item !== filterValue
    );
    setSelectedFilters(updatedFilters);
    setUpdateAppliedfilter(updatedFilters);

    handleApplyFilters(updatedFilters);
  };

  const handleSort = async (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);
    await applyFilters(selectedFilters, newSortOption);
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      category: [],
      tags: [],
      ingredients: [],
      instructions: null,
    });
    applyFilters({}, sortOption);
    setNoFiltersApplied(true);
  };

  useEffect(() => {
    const debouncedApplyFilters = debounce((title) => {
      applyFilters({ title }, sortOption);
    }, 500);

    debouncedApplyFilters(searchTerm);

    return () => {
      debouncedApplyFilters.cancel();
    };
  }, [searchTerm, sortOption]);

  return (
    <div>
      <div className="container flex items-center justify-between">
        <Button
          variant="outlined"
          size="large"
          onClick={handleOpen}
          className="border border-gray-800 rounded-full dark:text-blue-950 hover:text-white hover:bg-gray-900"
        >
          Filters
        </Button>
        <div className="flex items-center mx-auto space-x-5 gap-80">
          <label htmlFor="search" />
          <input
            className="relative z-10 w-12 h-12 p-2 pl-12 text-2xl bg-transparent border rounded-full outline-none cursor-pointer peer focus:w-full focus:cursor-text focus:border-black focus:pl-16 focus:pr-4"
            type="text"
            id="search"
            placeholder="Search...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-black px-3.5 peer-focus:border-black peer-focus:stroke-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

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
              name="sortOption"
              value={sortOption}
              onChange={handleSort}
            >
              <option aria-label="None" value="" />
              <optgroup name="prep" label="Prep Time">
                <option value="prep ASC">Prep ASC</option>
                <option value="prep DESC">Prep DESC</option>
              </optgroup>
              <optgroup name="cook" label="Cook Time">
                <option value="cook ASC">Cook ASC</option>
                <option value="cook DESC">Cook DESC</option>
              </optgroup>
              <optgroup name="published" label="Date Created">
                <option value="date ASC">Date ASC</option>
                <option value="date DESC">Date DESC</option>
              </optgroup>
              <optgroup name="instructions" label="Instructions">
                <option value="instructions ASC">Instructions ASC</option>
                <option value="instructions DESC">Instructions DESC</option>
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
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      )}
      <div>
        <h2>Applied Filters:</h2>
        {selectedFilters.category && (
          <Chip
            key={selectedFilters.category}
            label={selectedFilters.category}
            onDelete={() => handleDelete("category", selectedFilters.category)}
          />
        )}
        {Array.isArray(selectedFilters.tags) &&
          selectedFilters.tags.map((filter, index) => (
            <Chip
              key={index}
              label={filter}
              onDelete={() => handleDelete("tags", filter)}
            />
          ))}
        {selectedFilters.ingredients && (
          <Chip
            key={selectedFilters.ingredients}
            label={selectedFilters.ingredients}
            onDelete={() => handleDelete("ingredients", selectedFilters.ingredients)}
          />
        )}
        {selectedFilters.instructions !== null && (
          <Chip
            label={selectedFilters.instructions}
            onDelete={() =>
              handleDelete("instructions", selectedFilters.instructions)
            }
          />
        )}
      </div>
      {noFiltersApplied && <p className="px-4 py-2 my-4 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded-md">No filters have been applied.</p>}
      <Chip
        color="secondary"
        label="Clear All Filters"
        size="small"
        variant="outlined"
        onClick={handleResetFilters}
      />
    </div>
  );
};

export default SearchBar;
