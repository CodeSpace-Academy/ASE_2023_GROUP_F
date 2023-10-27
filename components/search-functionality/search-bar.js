import React, { useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "./Modal";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { getViewRecipes } from "@/lib/view-recipes";
import RecipeList from "../recipe-collection/RecipeList";
import CardSkeleton from "../skeletonCard/skeleton";
import RecipeCard from "../card/RecipeCard";

const PAGE_SIZE = 48;

const SearchBar = () => {
	const [open, setOpen] = useState(false);
	const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filtredRecipesCount, setFiltredRecipesCount] = useState(0)
	const [appliedFilters, setAppliedFilters] = useState({
		category: [],
		tags: [],
		ingredients: [],
		instructions: null,
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleApplyFilters = async (filters) => {
		setAppliedFilters('*******',filters);

		const filtering = await getViewRecipes(0, PAGE_SIZE, filters);
		setFilteredRecipes(filtering.recipes);
    setFiltredRecipesCount(filtering.totalRecipes);
   
	};

	const handleDelete = (filterType, filterValue) => {
		const updatedFilters = { ...appliedFilters };
		updatedFilters[filterType] = updatedFilters[filterType].filter(
			(item) => item !== filterValue,
		);
		setAppliedFilters(updatedFilters);
	};

  if(!filteredRecipes && !filtredRecipesCount) {
    return <CardSkeleton/>
  }

	console.log("12345###", filteredRecipes , '=> &&&&' , filtredRecipesCount );

	const renderFilter = (name, value) => {
		if (Array.isArray(value) && value.length > 0) {
			return (
				<div key={name}>
					<strong>{name}: </strong>
					<Stack direction="row" spacing={1}>
						{value.map((filter, index) => (
							<Chip
								key={index}
								label={filter}
								onDelete={() => handleDelete(name.toLowerCase(), filter)}
							/>
						))}
					</Stack>
				</div>
			);
		} else if (value) {
			return (
				<div key={name}>
					<strong>{name}: </strong>
					<Chip
						label={value}
						onDelete={() => handleDelete(name.toLowerCase(), value)}
					/>
				</div>
			);
		}
		return null;
	};

	return (
		<div>
			<label htmlFor="search" />
			<input type="text" id="search" placeholder="Search...." />

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
				>
					<option aria-label="None" value="" />
					<optgroup label="Prep Time">
						<option value={1}>Prep ASC</option>
						<option value={2}>Prep DESC</option>
					</optgroup>
					<optgroup label="Cook Time">
						<option value={3}>Cook ASC</option>
						<option value={4}>Cook DESC</option>
					</optgroup>
					<optgroup label="Date Created">
						<option value={3}>Date ASC</option>
						<option value={4}>Date DESC</option>
					</optgroup>
				</Select>
			</FormControl>

			{open && (
				<Modal handleClose={handleClose} applyFilters={handleApplyFilters} />
			)}

			<div>
				<h2>Applied Filters:</h2>
				{renderFilter("Categories", appliedFilters.category)}
				{renderFilter("Tags", appliedFilters.tags)}
				{renderFilter("Ingredients", appliedFilters.ingredients)}
				{appliedFilters.instructions !== null && (
					<div>
						<strong>Instructions Filter: </strong>
						<Chip
							label={appliedFilters.instructions}
							onDelete={() =>
								handleDelete("instructionsfilter", appliedFilters.instructions)
							}
						/>
					</div>
				)}
			</div>
      {/* <RecipeList visibleRecipes={filteredRecipes} count={filtredRecipesCount}/> */}

      {filteredRecipes?.map(recipe =>(
        <RecipeCard title={recipe.title} images={recipe.images} recipe={recipe}/>
      ))}
		</div>
	);
};

export default SearchBar;
