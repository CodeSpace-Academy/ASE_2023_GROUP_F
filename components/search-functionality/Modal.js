import { useContext, useEffect, useState } from "react";
import classes from "./modal.module.css";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { filterContext } from "./filterContext";
import { getCategories } from "@/lib/view-recipes";

function Modal(props) {
  const { handleClose, applyFilters } = props;
  const [tags, setTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const [categories, setCategories] = useState([]);
  const { filters, setFilters, selectedFilters, setSelectedFilters } =
    useContext(filterContext);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);

    if (data.tags) {
      data.tags = data.tags.split(",").map((tag) => tag.trim());
    }

    data.tags = tagOptions;
    data.category = categoryOption;
    await applyFilters(data);
    handleClose();
  };

  const clearAllFilters = () => {
    setFilters({
      categories: "",
      tags: "",
      instructions: "",
      ingredients: "",
    });

    setSelectedFilters({
      categories: null,
      tags: "",
      instructions: "",
      ingredients: "",
    });
  };

  return (
    <div className={classes.modalBackdrop}>
      <div className={`${classes.modalContent} dark:bg-dark dark:text-white`}>
        <div>
          <p style={{ margin: "0", fontWeight: "500", fontSize: "22px" }}>
            Filters
          </p>
          <span className={classes.closeButton} onClick={handleClose}>
            &times;
          </span>
          <hr
            style={{
              margin: "0 auto",
              marginTop: "10px",
              marginBottom: "15px",
              width: "100%",
              border: "0",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
            }}
          />
        </div>

        <form onSubmit={handleSubmit} id="form">
          <div>
            <Autocomplete
              className={classes.formInput}
              id="categories"
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

            <Autocomplete
              className={classes.formInput}
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

            <TextField
              className={classes.formInput}
              id="outlined-basic"
              label="Ingredients"
              variant="outlined"
              name="ingredients"
              value={filters.ingredients}
            />
          </div>

          <h4 className="font-bold">Number of Instructions:</h4>
          <TextField
            className={classes.formInput}
            type="number"
            name="instructions"
            value={filters.instructions}
          />

          <br />
          <button
            className="flex items-center p-2 border border-gray-800 rounded-full dark:text-black-950 hover:text-white hover:bg-gray-900"
            style={{
              position: "absolute",
              top: "385px",
              left: "20px",
              fontSize: "15px",
              cursor: "pointer",
              fontWeight: "600",
            }}
            size="small"
            variant="outlined"
            onClick={clearAllFilters}
          >
            Clear All Filters
          </button>

          <button
            className="flex items-center p-2 border border-gray-800 rounded-full hover:text-white hover:bg-gray-900"
            form="form"
            id="applyFilterSort"
            type="submit"
            size="small"
            variant="outlined"
            style={{
              position: "absolute",
              top: "385px",
              right: "20px",
              fontSize: "15px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
