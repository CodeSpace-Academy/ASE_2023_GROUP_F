import { useState, useEffect, useContext } from "react";
import { Chip, Button } from "@mui/material";
import { debounce } from "lodash";
import Modal from "./Modal";
import { filterContext } from "./filterContext";

/**
 * SearchBar Component
 *
 * @param {Object} props - Component properties
 * @param {Function} props.applyFilters - Function to apply filters.
 * @param {Object} props.appliedFilters - Applied filters.
 *
 * @returns {JSX.Element} SearchBar component
 */

const SearchBar = (props) => {
	const { applyFilters } = props;

	const {
		filters,
		setFilters,
		sortOption,
		setSortOption,
		selectedFilters,
		setSelectedFilters,
		noFiltersApplied,
		setNoFiltersApplied,
		searchTerm,
		setSearchTerm,
	} = useContext(filterContext);

	const [open, setOpen] = useState(false);
	const [updateAppliedFilter, setUpdateAppliedfilter] = useState({
		category: null,
		tags: [],
		ingredients: null,
		instructions: null,
	});
	const [buttonEnabled, setButtonEnabled] = useState(true);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	

	const handleApplyFilters = async (filters) => {
		handleClose()
		const nonEmptyFilters = {};
		for (const key in filters) {
			if (
				filters[key] !== null &&
				filters[key] !== "" &&
				filters[key]?.length > 0
			) {
				nonEmptyFilters[key] = filters[key];
			}

			setNoFiltersApplied(false);
		}

		setFilters((prevFilters) => ({
			...prevFilters,
			...nonEmptyFilters,
		}));
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			...nonEmptyFilters,
		}));
		setSearchTerm(searchTerm);

		await applyFilters(filters , {searchTerm});

	};

	const handleDelete = async (filterType, filterValue) => {
		setFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters };

			if (Array.isArray(updatedFilters[filterType])) {
				updatedFilters[filterType] = updatedFilters[filterType].filter(
					(item) => item !== filterValue,
				);

				if (updatedFilters[filterType]?.length === 0) {
					updatedFilters[filterType] = [];
				}
			} else {
				if (filterType === "category" || filterType === "ingredients") {
					updatedFilters[filterType] = null;
				} else if (filterType === "instructions") {
					updatedFilters[filterType] = null;
				}
			}

			setUpdateAppliedfilter(updatedFilters);
			applyFilters(updatedFilters);

			setSelectedFilters((prevFilters) => {
				const updatedSelectedFilters = { ...prevFilters };

				if (Array.isArray(updatedSelectedFilters[filterType])) {
					updatedSelectedFilters[filterType] = updatedSelectedFilters[
						filterType
					].filter((item) => item !== filterValue);

					if (updatedSelectedFilters[filterType]?.length === 0) {
						updatedSelectedFilters[filterType] = {};
					}
				} else {
					if (filterType === "category" || filterType === "ingredients") {
						updatedSelectedFilters[filterType] = null;
					} else if (filterType === "instructions") {
						updatedSelectedFilters[filterType] = null;
					}
				}

				return updatedSelectedFilters;
			});

			const hasNoFiltersLeft = Object.values(updatedFilters).every(
				(value) =>
					value === null ||
					(Array.isArray(value) && value?.length === 0) ||
					value === "",
			);

			if (hasNoFiltersLeft) {
				setNoFiltersApplied(true);
			}

			return updatedFilters;
		});
	};

	const handleSort = async (event) => {
		const newSortOption = event.target.value;
		setSortOption(newSortOption);
		await applyFilters(filters, newSortOption);
	};

	const handleResetFilters = async () => {
		setSelectedFilters({
			category: null,
			tags: [],
			ingredients: null,
			instructions: null,
		});
		await applyFilters({});
		setFilters({} , sortOption);
		setNoFiltersApplied(true);
	};


  useEffect(() => {
    const debouncedApplyFilters = debounce(async (title) => {
      await applyFilters({ ...filters, title });
      setButtonEnabled(true);
    }, 500);

    const shortQueryDebounce = debounce(async () => {
      await applyFilters({ ...filters, title });
      setButtonEnabled(true);
    }, 500);

    const longQueryDebounce = debounce(async () => {
      if (searchTerm.length > 10) {
        await applyFilters({ ...filters, title: searchTerm });
        setButtonEnabled(true);
      }
    }, 1000);

    const applyDebounce = () => {
      if (searchTerm.length < 10) {
        shortQueryDebounce();
      } else {
        longQueryDebounce();
      }
    };

    const timeoutId = setTimeout(() => {
      if (searchTerm.length > 0) {
        applyDebounce();
      }
    }, 500);

    return () => {
      debouncedApplyFilters.cancel();
      shortQueryDebounce.cancel();
      longQueryDebounce.cancel();
      clearTimeout(timeoutId);
    };
  }, [searchTerm, filters, sortOption]);

	return (
		<div className="my-6">
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
						className="w-full md:min-w-[500px] p-2 pl-10 text-2xl rounded-full"
						type="text"
						id="search"
						placeholder="Search...."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					 {buttonEnabled && (
          <Button
            variant="contained"
            size="large"
            onClick={() => applyFilters({ ...filters, title: searchTerm })}
          >
            Submit
          </Button>
        )}
				</div>

				<div className="flex items-center border border-gray-800 rounded-full p-2 m-1 min-w-[50px]">
					<label
						htmlFor="grouped-native-select"
						className="flex items-center rounded-full md:flex"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6 md:mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
							/>
						</svg>
						<span className="hidden md:inline-block">Sort By</span>
					</label>

					<select
						id="grouped-native-select"
						name="sortOption"
						value={sortOption}
						onChange={handleSort}
						className="text-gray-800 bg-slate-300 outline-none border-none min-w-[50px] md:flex-grow md:w-auto "
					>
						<option
							aria-label="None"
							value=""
							className="text-sm hidden md:block p-4 m-8"
						>
							Default
						</option>
						<optgroup label="Prep Time">
							<option value="prep ASC">Prep ASC</option>
							<option value="prep DESC">Prep DESC</option>
						</optgroup>
						<optgroup label="Cook Time">
							<option value="cook ASC">Cook ASC</option>
							<option value="cook DESC">Cook DESC</option>
						</optgroup>
						<optgroup label="Date Created">
							<option value="date ASC">Date ASC</option>
							<option value="date DESC">Date DESC</option>
						</optgroup>
						<optgroup label="Instructions">
							<option value="instructions ASC">Instructions ASC</option>
							<option value="instructions DESC" className="m-8">
								Instructions DESC
							</option>
						</optgroup>
					</select>
				</div>
			</div>

			{open && (
				<Modal
					handleClose={handleClose}
					applyFilters={handleApplyFilters}
					clearAllFilters={handleResetFilters}
				/>
			)}
			<div>
				<h2 className="font-bold">Applied Filters:</h2>
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
									onDelete={() => {
										handleDelete("category", selectedFilters.category);
									}}
								/>
							</div>
						</div>
					)}
				{Object.entries(selectedFilters).map(([filterName, filterValues]) =>
					filterName !== "instructions" &&
					Array.isArray(filterValues) &&
					filterValues?.length > 0 ? (
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
								{filterValues?.map((value, index) => (
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

				{selectedFilters?.ingredients !== null &&
					selectedFilters?.ingredients !== "" && (
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
									label={selectedFilters?.ingredients}
									onDelete={() => {
										handleDelete("ingredients", selectedFilters?.ingredients);
									}}
								/>
							</div>
						</div>
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
									onDelete={() => {
										handleDelete("instructions", selectedFilters.instructions);
									}}
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

