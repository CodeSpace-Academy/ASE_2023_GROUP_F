import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Modal from "./Modal";
import { debounce } from "lodash";

const SearchBar = ({ applyFilters, setAppliedFilters, appliedFilters }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
      await applyFilters(nonEmptyFilters);
    }
    setAppliedFilters(filters);
  };

  const handleDelete = (filterType, filterValue) => {
    const updatedFilters = { ...selectedFilters };
    updatedFilters[filterType] = updatedFilters[filterType].filter(
      (item) => item !== filterValue
    );
    setAppliedFilters(updatedFilters);
  };

  const handleSortChange = (event) => {};

  useEffect(() => {
    const debouncedApplyFilters = debounce((title) => {
      applyFilters({ title });
    }, 500);

    debouncedApplyFilters(searchTerm);

    return () => {
      debouncedApplyFilters.cancel();
    };
  }, [searchTerm]);

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
        />
      )}

      <div>
        <h2>Applied Filters:</h2>
        {selectedFilters.category.map((filter, index) => (
          <Chip
            key={index}
            label={filter}
            onDelete={() => handleDelete("category", filter)}
          />
        ))}
        {selectedFilters.tags.map((filter, index) => (
          <Chip
            key={index}
            label={filter}
            onDelete={() => handleDelete("tags", filter)}
          />
        ))}
        {selectedFilters.ingredients.map((filter, index) => (
          <Chip
            key={index}
            label={filter}
            onDelete={() => handleDelete("ingredients", filter)}
          />
        ))}
        {selectedFilters.instructions !== null && (
          <Chip
            label={selectedFilters.instructions}
            onDelete={() =>
              handleDelete("instructions", selectedFilters.instructions)
            }
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
