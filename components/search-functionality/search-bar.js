import { useState, useEffect, useContext } from "react";

import { Chip, Button, InputLabel, FormControl, Select } from "@mui/material";
import { debounce } from "lodash";
import Modal from "./Modal";
import { filterContext } from "./filterContext";

const SearchBar = ({ applyFilters, appliedFilters }) => {
	const [open, setOpen] = useState(false);
	const [noFiltersApplied, setNoFiltersApplied] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [updateAppliedFilter, setUpdateAppliedfilter] = useState({
		category: [],
		tags: [],
		ingredients: [],
		instructions: null,
	});

	const { filters, setFilters } = useContext(filterContext);

	console.log("filters from useContext", filters);

	const [selectedFilters, setSelectedFilters] = useState({
		category: [],
		tags: [],
		ingredients: [],
		instructions: null,
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleApplyFilters = async (filters) => {
		console.log("Applied filters", filters);
		const nonEmptyFilters = {};
		for (const key in filters) {
			if (
				key === "tags" &&
				filters[key] !== null &&
				filters[key] !== "" &&
				filters[key].length > 0
			) {
				nonEmptyFilters[key] = filters[key];
			} else if (
				key !== "tags" &&
				filters[key] !== null &&
				filters[key] !== ""
			) {
				nonEmptyFilters[key] = filters[key];
			}
		}

		if (Object.keys(nonEmptyFilters).length > 0) {
			await applyFilters(nonEmptyFilters);
			setNoFiltersApplied(false);
		}
		setSelectedFilters(filters);
	};

	console.log("Selected filters", selectedFilters);

	const handleDelete = (filterType, filterValue) => {
		const updatedFilters = { ...selectedFilters };
		updatedFilters[filterType] = updatedFilters[filterType].filter(
			(item) => item !== filterValue,
		);
		setSelectedFilters(updatedFilters);
		setUpdateAppliedfilter(updatedFilters);

		handleApplyFilters(updatedFilters);
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

	return (
		<div>
			<div className="flex container items-center justify-between">
				<Button
					variant="outlined"
					size="large"
					onClick={handleOpen}
					className="border-gray-800 dark:text-blue-950 hover:text-white border hover:bg-gray-900 rounded-full"
				>
					Filters
				</Button>
				<div className="flex mx-auto gap-80 items-center space-x-5">
					<label htmlFor="search" />
					<input
						className="rounded text-2xl p-2"
						type="text"
						id="search"
						placeholder="Search...."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

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
				</div>
			</div>

			{open && (
				<Modal
					handleClose={handleClose}
					applyFilters={handleApplyFilters}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					instructions={appliedFilters.instructions}
				/>
			)}
			<div className="mt-4 flex flex-wrap gap-2">
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
				<p className="text-center text-gray-500 text-lg mt-4">
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
