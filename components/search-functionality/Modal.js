import React, { useState, useContext } from "react";
import classes from "./modal.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { filterContext } from "./filterContext";

function Modal(props) {
  const { handleClose, applyFilters, searchTerm } = props;

  const { filters, setFilters } = useContext(filterContext);
  
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


  const clearAllFilters = () => {
    setFilters({
      categories:"",
      tags:"",
      instructions: null,
      ingredients: "",
    })
  };

  return (
    
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
                name="categories"
                value={filters.categories}
                onChange={handleChange}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Tags"
                variant="outlined"
                name="tags"
                value={filters.tags}
                onChange={handleChange}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Ingredients"
                variant="outlined"
                name="ingredients"
                value={filters.ingredients}
                onChange={handleChange}
              />
            </div>

            <h4>Number of Instructions:</h4>
            <TextField
              type="number"
              name="instructions"
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
   
  );
}

export default Modal;

