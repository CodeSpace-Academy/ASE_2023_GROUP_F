import React, { useState, useEffect, useContext } from "react";
import { Chip, Button, InputLabel, FormControl, Select } from "@mui/material";
import { debounce } from "lodash";
import Modal from "./Modal";
import { filterContext } from "./filterContext";

const SearchBar = (props) => {
  const {
    applyFilters,
    appliedFilters,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
  } = props;
  const [open, setOpen] = useState(false);
  const [noFiltersApplied, setNoFiltersApplied] = useState(true);
  const [updateAppliedFilter, setUpdateAppliedfilter] = useState({
    category: [],
    tags: [],
    ingredients: [],
    instructions: null,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    tags: [],
    ingredients: [],
    instructions: null,
  });

  const [queryType, setQueryType] = useState("short");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const shortQueryDebounce = debounce((query) => {
    applyFilters({ title: query }, sortOption);
    setButtonEnabled(true);
  }, 500);

  const longQueryDebounce = debounce((query) => {
    setButtonEnabled(true);
  }, 1000);

  const handleQueryChange = (query) => {
    setSearchTerm(query);
    setIsLoading(true);

    if (query.length < 10) {
      setQueryType("short");
      shortQueryDebounce(query);
    } else {
      setQueryType("long");
      longQueryDebounce(query);
    }
  };

  const handleDelete = (filterType, filterValue) => {
    const updatedFilters = { ...selectedFilters };
    updatedFilters[filterType] = updatedFilters[filterType].filter(
      (item) => item !== filterValue
    );
    setSelectedFilters(updatedFilters);
    setUpdateAppliedfilter(updatedFilters);

    applyFilters(updatedFilters);
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

  const handleLongQuerySubmit = () => {
    applyFilters({ title: searchTerm });
  };

  useEffect(() => {
    if (queryType === "short") {
      const delay = 1000;
      const timer = setTimeout(() => {
        if (searchTerm.length < 10) {
          handleLongQuerySubmit();
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, queryType, handleLongQuerySubmit]);

  return (
    <div>
      <div className="flex container items-center justify-between">
        <Button
          variant="outlined"
          size="large"
          onClick={handleOpen}
          className="border-gray-800 dark:text-blue-950 hover:text-white border hover-bg-gray-900 rounded-full"
        >
          Filters
        </Button>
        <div className="flex mx-auto gap-10 items-center space-x-5">
          <label htmlFor="search" />
          <input
            className="rounded text-2xl p-2"
            type="text"
            id="search"
            placeholder="Search...."
            value={searchTerm}
            onChange={(e) => handleQueryChange(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLongQuerySubmit}
          >
            Submit
          </Button>
          <FormControl
            className="border-gray-800 hover-bg-slate-200"
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel htmlFor="grouped-native-select">Sort By</InputLabel>
            <Select
              native
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
          handleClose={() => setOpen(false)}
          applyFilters={applyFilters}
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
      {noFiltersApplied && (
        <p className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 my-4 rounded-md">
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
  );
};

export default SearchBar;
