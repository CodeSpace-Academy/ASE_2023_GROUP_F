import React, { useContext, useEffect, useState } from "react";
import classes from "./modal.module.css";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { filterContext } from "./filterContext";
import { getCategories, getIngredients } from "@/lib/view-recipes";
import { result } from "lodash";

function Modal(props) {
  const { handleClose, applyFilters } = props;
  const [tags, setTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsOption, setIngredientsOption] = useState([]);
  const { filters, setFilters } = useContext(filterContext);

  useEffect(() => {
    const fetchTags = async () => {
      const result = await getCategories();
      const fetchedTags = result.categories[0].categories;
      if (Array.isArray(fetchedTags)) {
        setTags(fetchedTags);
        setCategories(fetchedTags);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    try {
      async function getIngredients() {
        const result = await fetch("/api/ingredient");
        const ingredientsArray = await result.json();
        setIngredients(ingredientsArray?.ingredients[0].ingredientsArray);
      }

      getIngredients();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);

    if (data.tags) {
      data.tags = data.tags.split(",").map((tag) => tag.trim());
    } else {
      data.tags = [];
    }
    data.tags = tagOptions;
    data.category = categoryOption;
    data.ingredients = ingredientsOption;
    // setFilters(data);
    await applyFilters(data);
    handleClose();
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      tags: [],
      instructions: null,
      ingredients: "",
    });
    setTagOptions([]);
    setCategoryOption([]);
    setIngredientsOption([]);
  };

  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        <span className={classes.closeButton} onClick={handleClose}>
          &times;
        </span>

        <form onSubmit={handleSubmit} id="form">
          <h2 className="mb-2 mr-5 font-bold">Filter</h2>
          <div>
            <Autocomplete
              id="outlined-basic"
              options={categories}
              getOptionLabel={(option) => option}
              value={filters.category}
              onChange={(event, newValue) => {
                setCategoryOption(newValue);
              }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Categories" variant="outlined" />
              )}
            />
            <br />
            <Autocomplete
              multiple
              id="tags"
              options={tags}
              getOptionLabel={(option) => option}
              value={filters.tags}
              onChange={(event, newValue) => {
                if (newValue !== undefined && Array.isArray(newValue)) {
                  setTagOptions(newValue);
                } else {
                  setTagOptions([]);
                }
              }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Tags" variant="outlined" />
              )}
            />
            <Autocomplete
              id="outlined-basic"
              options={ingredients}
              getOptionLabel={(option) => option}
              value={filters.ingredients}
              onChange={(event, newValue) => {
                setIngredientsOption(newValue);
              }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Ingredients" />
              )}
            />
          </div>

          <p
            style={{
              fontSize: "14px,",
            }}
          >
            Number of Instrutions
          </p>
          <TextField
            className={classes.form}
            type="number"
            name="instructions"
            value={filters.instructions}
          />

          <br />
          <Button
            style={{
              position: "absolute",
              top: "400px",
              left: "25px",
              fontSize: "15px",
              cursor: "pointer",
            }}
            size="small"
            variant="outlined"
            onClick={clearAllFilters}
          >
            Clear All Filters
          </Button>
          <br />
          <Button
            form="form"
            id="applyFilterSort"
            type="submit"
            size="small"
            variant="outlined"
            style={{
              position: "absolute",
              top: "400px",
              right: "25px",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Apply
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
