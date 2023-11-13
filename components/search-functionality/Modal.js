import React, { useContext, useEffect, useState } from "react";
import classes from "./modal.module.css";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { filterContext } from "./filterContext";
import { getCategories } from "@/lib/view-recipes";

function Modal(props) {
	const { handleClose, applyFilters } = props;
	const [tags, setTags] = useState([]);
	const [tagOptions, setTagOptions] = useState([]);
	const { filters, setFilters } = useContext(filterContext);

	useEffect(() => {
		const fetchTags = async () => {
			const result = await getCategories();
			const fetchedTags = result.categories[0].categories;
			if (Array.isArray(fetchedTags)) {
				setTags(fetchedTags);
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
		} else {
			data.tags = [];
		}
		data.tags = tagOptions;
		await applyFilters(data);
		setFilters(data)
		handleClose();
	};

	const clearAllFilters = () => {
		setFilters({
			categories: "",
			tags: "",
			instructions: null,
			ingredients: "",
		});
		setTagOptions([]);
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
						<TextField
							className="mb-2"
							id="outlined-basic"
							label="Categories"
							variant="outlined"
							name="category"
							value={filters.category}
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
							renderInput={(params) => (
								<TextField {...params} label="Tags" variant="outlined" />
							)}
						/>

						<br />
						<TextField
							className="mb-2"
							id="outlined-basic"
							label="Ingredients"
							variant="outlined"
							name="ingredients"
							value={filters.ingredients}
						/>
					</div>

					<h4 className="font-bold">Number of Instructions:</h4>
					<TextField
						className="mb-2 mt-1"
						type="number"
						name="instructions"
						value={filters.instructions}
					/>

					<br />
					<Button
						color="secondary"
						size="small"
						variant="outlined"
						onClick={clearAllFilters}
					>
						Clear All Filters
					</Button>
					<br />
					<Button
						className="mt-2"
						form="form"
						id="applyFilterSort"
						type="submit"
						color="secondary"
						size="small"
						variant="outlined"
					>
						Apply
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Modal;
