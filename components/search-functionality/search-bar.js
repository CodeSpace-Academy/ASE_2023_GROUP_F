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
		// sortOption,
		// setSortOption,
	} = props;

	const { filters, setFilters, sortOption, setSortOption } = useContext(filterContext);
	const [open, setOpen] = useState(false);
	const [noFiltersApplied, setNoFiltersApplied] = useState(true);
	const [updateAppliedFilter, setUpdateAppliedfilter] = useState({
		category: null,
		tags: [],
		ingredients: null,
		instructions: null,
	});

	const [selectedFilters, setSelectedFilters] = useState({
		category: null,
		tags: [],
		ingredients: null,
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

			setNoFiltersApplied(false);
		}

		if (Object.keys(nonEmptyFilters).length > 0) {
			await applyFilters(nonEmptyFilters, sortOption);
		}
		setFilters(filters);
		setSelectedFilters(filters);
	};

	const handleDelete = (filterType, filterValue) => {
		const updatedFilters = { ...selectedFilters };
		updatedFilters[filterType] = updatedFilters[filterType].filter(
			(item) => item !== filterValue,
		);
		setSelectedFilters(updatedFilters);
		setUpdateAppliedfilter(updatedFilters);

		handleApplyFilters(updatedFilters);
	};

	const handleSort = async (event) => {
		const newSortOption = event.target.value;
		// setSortOption(newSortOption);
		await applyFilters(filters, newSortOption);
	};

	const handleResetFilters = () => {
		setSelectedFilters({
			category: null,
			tags: [],
			ingredients: null,
			instructions: null,
		});
		applyFilters({});
		setNoFiltersApplied(true);
	};

	useEffect(() => {
		const debouncedApplyFilters = debounce((title) => {
			applyFilters({ ...filters, title });
		}, 500);

		debouncedApplyFilters(searchTerm);

		return () => {
			debouncedApplyFilters.cancel();
		};
	}, [searchTerm]);

	return (
		<div>
			<div className="container flex items-center justify-between">
				<Button
					variant="outlined"
					size="large"
					onClick={handleOpen}
					className="flex items-center border border-gray-800 rounded-full dark:text-blue-950 hover:text-white hover:bg-gray-900"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
						/>
					</svg>

					<span className="hidden md:inline-block ml-2">Filters</span>
				</Button>

				<div className="relative flex items-center">
					<label htmlFor="search" className="sr-only">
						Search
					</label>
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6 text-gray-400"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
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

				<div>
					<FormControl
						className="border-gray-800 hover:bg-slate-200"
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
					handleClose={handleClose}
					applyFilters={handleApplyFilters}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					instructions={appliedFilters.instructions}
					// sortOption={sortOption}
					// setSortOption={setSortOption}
				/>
			)}
			<div>
				<h2 className="font-bold">Applied Filters:</h2>
				{Object.entries(selectedFilters).map(([filterName, filterValues]) =>
					filterName !== "instructions" &&
					Array.isArray(filterValues) &&
					filterValues.length > 0 ? (
						<div
							key={filterName}
							style={{
								display: "inline-block",
								marginRight: "1rem",
								maxWidth: 500,
							}}
						>
							<strong>{filterName}:</strong>
							<div style={{ display: "flex", flexWrap: "wrap" }}>
								{filterValues.map((value, index) => (
									<Chip
										key={index}
										label={value}
										onDelete={() => handleDelete(filterName, value)}
									/>
								))}
							</div>
						</div>
					) : null,
				)}

				{selectedFilters.instructions !== null &&
					selectedFilters.instructions !== "" && (
						<div
							style={{
								display: "inline-block",
								marginRight: "1rem",
								maxWidth: 500,
							}}
						>
							<strong>Instructions:</strong>
							<div style={{ display: "flex", flexWrap: "wrap" }}>
								<Chip
									label={selectedFilters.instructions}
									onDelete={() =>
										setSelectedFilters((prevFilters) => ({
											...prevFilters,
											instructions: null,
										}))
									}
								/>
							</div>
						</div>
					)}

				{selectedFilters.category !== null &&
					selectedFilters.category !== "" && (
						<div
							style={{
								display: "inline-block",
								marginRight: "1rem",
								maxWidth: 500,
							}}
						>
							<strong>Category:</strong>
							<div style={{ display: "flex", flexWrap: "wrap" }}>
								<Chip
									label={selectedFilters.category}
									onDelete={() =>
										setSelectedFilters((prevFilters) => ({
											...prevFilters,
											category: null,
										}))
									}
								/>
							</div>
						</div>
					)}

				{selectedFilters.ingredients !== null &&
					selectedFilters.ingredients !== "" && (
						<div
							style={{
								display: "inline-block",
								marginRight: "1rem",
								maxWidth: 500,
							}}
						>
							<strong>Ingredients:</strong>
							<div style={{ display: "flex", flexWrap: "wrap" }}>
								<Chip
									label={selectedFilters.ingredients}
									onDelete={() =>
										setSelectedFilters((prevFilters) => ({
											...prevFilters,
											ingredients: null,
										}))
									}
								/>
							</div>
						</div>
					)}
			</div>

			{!noFiltersApplied && (
				<Chip
					color="secondary"
					label="Clear All Filters"
					size="small"
					variant="outlined"
					onClick={handleResetFilters}
				/>
			)}

			{noFiltersApplied && (
				<p className="font-light text-blue-950">
					No filters have been applied.
				</p>
			)}
		</div>
	);
};

export default SearchBar;
