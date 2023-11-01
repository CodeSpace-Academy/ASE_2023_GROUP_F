import React, { useState, useContext } from "react";
import classes from "./modal.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { filterContext, FilterProvider } from "./filterContext";

function Modal(props) {
  const { handleClose, applyFilters, searchTerm } = props;

  const { filters, setFilters } = useContext(filterContext);
  // const [categories, setCategories] = useState('')
  // const [tags, setTags] = useState('')
  // const [instructionsFilter, setInstructionsFilter] = useState(null)
  // const [ingredients, setIngredients] = useState('')

  // const applyFiltersAndCloseModal = async () => {
  //   const appliedFilters = {
  //     category: Array.isArray(categories)
  //       ? categories
  //       : categories
  //       ? categories.split(",").map((categories) => categories.trim())
  //       : [],
  //     tags: Array.isArray(tags)
  //       ? tags
  //       : tags
  //       ? tags.split(",").map((tag) => tag.trim())
  //       : [],
  //     ingredients: Array.isArray(ingredients)
  //       ? ingredients
  //       : ingredients
  //       ? ingredients.split(",").map((ingredient) => ingredient.trim())
  //       : [],
  //     instructions:
  //       instructions !== null ? instructions : instructions,
  //     title: searchTerm,
  //     isFavorite: true,
  //   };

  //   await applyFilters(appliedFilters);
  //   handleClose();
  // };
  const applyFiltersAndCloseModal = async () => {
    await applyFilters(filters);
    handleClose();
  }


  const handleChange = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // const handleIngredientsChange = (event) => {
  //   setIngredients(event.target.value)
  // }

  // const handleCategoriesChange = (event) => {
  //   setCategories(event.target.value)
  // }

  // const handleTagsChange = (event) => {
  //   setTags(event.target.value)
  // }

  // const handleInstructionChange = (event) => {
  //   setInstructionsFilter(Math.max(1, parseInt(event.target.value)))
  // }

  const clearAllFilters = () => {
    setFilters({
      categories:"",
      tags:"",
      instructions: null,
      ingredients: "",
    })
  };

  return (
    <FilterProvider>
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
                value={filters.categories}
                onChange={handleChange}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Tags"
                variant="outlined"
                value={filters.tags}
                onChange={handleChange}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Ingredients"
                variant="outlined"
                value={filters.ingredients}
                onChange={handleChange}
              />
            </div>

            <h4>Number of Instructions:</h4>
            <TextField
              type="number"
              value={filters.instructions}
              onChange={handleChange}
            />

            <br />
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
    </FilterProvider>
  );
}

export default Modal;
