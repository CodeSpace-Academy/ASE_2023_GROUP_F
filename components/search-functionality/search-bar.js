import React, { useState, useEffect, useContext } from "react";
import { Chip, Button, InputLabel, FormControl, Select } from "@mui/material";
import { debounce } from "lodash";
import Modal from "./Modal";
import { filterContext } from "./filterContext";

const SearchBar = ({
  applyFilters,
  appliedFilters,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
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
    }

    if (Object.keys(nonEmptyFilters).length > 0) {
      await applyFilters(nonEmptyFilters, sortOption);
      setNoFiltersApplied(false);
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
    const newSortOption = event.target.value
    setSortOption(newSortOption);
    await applyFilters(filters, newSortOption);
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      category: [],
      tags: [],
      ingredients: [],
      instructions: null,
    });
    applyFilters({});
    setNoFiltersApplied(true);
  };

  useEffect(() => {
    const debouncedApplyFilters = debounce((title) => {
      applyFilters({ title });
    }, 500);

    debouncedApplyFilters(searchTerm);

    return () => {
      debouncedApplyFilters.cancel();
    };
  }, [searchTerm]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="container flex items-center justify-between">
        <Button
          variant="outlined"
          size="large"
          onClick={handleOpen}
          className="flex items-center border border-gray-800 rounded-full dark:text-blue-950 hover:text-white hover:bg-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
          </svg>

          <span class="hidden md:inline-block ml-2">Filters</span>
        </Button>

        

        <div className="relative flex items-center">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            className="w-full md:min-w-[400px] p-2 pl-10 text-2xl rounded-full"
            type="text"
            id="search"
            placeholder="Search...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center border border-gray-800 rounded-full p-2 m-1 min-w-[50px]">
          <label htmlFor="grouped-native-select" className="flex items-center rounded-full md:flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 md:mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            <span className="hidden md:inline-block">Sort By</span>
          </label>

          <select
            defaultValue=""
            id="grouped-native-select"
            name="sortOption"
            value={sortOption}
            onChange={handleSort}
            className="text-gray-800 outline-none border-none min-w-[50px] md:flex-grow"

          >
            <option aria-label="None" value="" className="text-sm">
              <span className="hidden md:block">Default Sorting</span>
            </option>
            <optgroup label="Prep Time">
              <option value="prep ASC">Prep ASC</option>
              <option value="prep DESC">Prep DESC</option>
            </optgroup>
            <optgroup label="Cook Time">
              <option value="cook ASC">Cook ASC</option>
              <option value="cook DESC">Cook DESC</option>
            </optgroup>
            <optgroup label="Date Created">
              <option value="date ASC">Date ASC</option>
              <option value="date DESC">Date DESC</option>
            </optgroup>
            <optgroup label="Instructions">
              <option value="instructions ASC">Instructions ASC</option>
              <option value="instructions DESC">Instructions DESC</option>
            </optgroup>
          </select>
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
            onDelete={() =>
              handleDelete("ingredients", selectedFilters.ingredients)
            }
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
      {noFiltersApplied && <p>No filters have been applied.</p>}
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