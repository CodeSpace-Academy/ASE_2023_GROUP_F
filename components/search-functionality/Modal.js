import  { useContext } from "react";
import classes from "./modal.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { filterContext } from "./filterContext";

function Modal(props) {
	const { handleClose, applyFilters } = props;

	const { filters, setFilters } = useContext(filterContext);


	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = new FormData(event.target);
		const data = Object.fromEntries(form);

		if (data.tags) {
			data.tags = data.tags.split(",").map((tag) => tag.trim());
		} else {
			data.tags = [];
		}

		await applyFilters(data);
		handleClose();
	};

	const clearAllFilters = () => {
		setFilters({
			categories: "",
			tags: "",
			instructions: null,
			ingredients: "",
		});
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
							className="mb-2 "
							id="outlined-basic"
							label="Categories"
							variant="outlined"
							name="category"
							value={filters.category}
						/>
						<br />
						<TextField
							className="mb-2 "
							id="outlined-basic"
							label="Tags"
							variant="outlined"
							name="tags"
							value={filters.tags}
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
						className={classes.clearButton}
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
