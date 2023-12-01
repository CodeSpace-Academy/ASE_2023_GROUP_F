import connectToDatabase from "../../database/database";

/**
 * API handler for fetching and updating recipes based on filters and sorting criteria.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

export default async function handler(req, res) {
	// Parse query parameters
	const filter = JSON.parse(req.query.filter);
	const sort = JSON.parse(req.query.sort);
	const limit = parseInt(req.query.limit) || 200;

	// Check if the HTTP method is GET or POST
	if (req.method === "GET") {
		try {
			// Connect to the MongoDB database
			const database = await connectToDatabase();
			const collection = database.collection("recipes");

			// Initialize aggregation pipeline stages and query filters
			const agg = [];
			const queryFilter = {};

			// Build query filters based on provided filter parameters
			if (filter.category) {
				queryFilter.category = {
					$regex: new RegExp(filter.category, "i"),
				};
			}

			// Handle array or string for tags filter
			if (filter.tags && Array.isArray(filter.tags)) {
				if (filter.tags.length > 0) {
					queryFilter.tags = {
						$in: filter.tags.map((tag) => new RegExp(tag, "i")),
					};
				}
			} else if (filter.tags) {
				queryFilter.tags = {
					$regex: new RegExp(filter.tags, "i"),
				};
			}

			if (filter.title) {
				queryFilter.title = {
					$regex: new RegExp(filter.title, "i"),
				};
			}

			if (filter.ingredients) {
				queryFilter[`ingredients.${filter.ingredients}`] = { $exists: true };
			}

			if (filter.instructions) {
				const instructionsCount = parseInt(filter.instructions);

				if (!isNaN(instructionsCount)) {
					queryFilter.instructions = {
						$size: instructionsCount,
					};

					agg.push({
						$match: {
							$expr: {
								$eq: [{ $size: "$instructions" }, instructionsCount],
							},
						},
					});
				}
			}

			let querySort = {};

			if (sort === "prep ASC") {
				querySort.prep = 1;
			} else if (sort === "prep DESC") {
				querySort.prep = -1;
			}

			if (sort === "cook ASC") {
				querySort.cook = 1;
			} else if (sort === "cook DESC") {
				querySort.cook = -1;
			}

			if (sort === "date ASC") {
				querySort.published = 1;
			} else if (sort === "date DESC") {
				querySort.published = -1;
			}

			if (sort === "instructions ASC") {
				querySort.instructions = 1;
			} else if (sort === "instructions DESC") {
				querySort.instructions = -1;
			}

			// Handle special case for sorting by instructions length
			if (sort === "instructions ASC" || sort === "instructions DESC") {
				const sortOrder = sort === "instructions ASC" ? 1 : -1;

				agg.push(
					{
						$addFields: {
							instructionsLength: { $size: "$instructions" },
						},
					},
					{
						$sort: {
							instructionsLength: sortOrder,
						},
					},
					{
						$project: {
							instructionsLength: 0,
						},
					},
				);
			} else {
				// Add aggregation stages based on sort criteria
				if (JSON.stringify(querySort) !== "{}") {
					agg.push({ $sort: querySort });
				}
			}

			// Add aggregation stage for filter criteria
			if (JSON.stringify(queryFilter) !== "{}") {
				agg.push({ $match: { ...queryFilter } });
			}

			// Add aggregation stage for limiting results
			agg.push({ $limit: limit });

			// Execute aggregation pipeline and fetch documents
			const documents = await collection.aggregate(agg).toArray();

			// Get the total count of recipes matching the query filters
			const number = await collection.countDocuments(queryFilter);

			// Respond with the fetched recipes and the count
			res.status(200).json({ recipes: documents, count: number });
		} catch (error) {
			console.error("Error fetching data:", error);
			res.status(500).json({ message: "Data fetching failed" });
		}
	} else if (req.method === "POST") {
		// Handle recipe update (marking/unmarking as favorite)
		try {
			const database = await connectToDatabase();
			const collection = database.collection("recipes");

			// Extract recipeId and isFavorite from the request body
			// Extract recipeId and isFavorite from the request body
			const { recipeId, isFavorite } = req.body;

			// Update the isFavorite field for the specified recipe
			await collection.updateOne(
				{ _id: recipeId },
				{ $set: { isFavorite: isFavorite } },
			);

			// Respond with a success message
			res.status(200).json({
				message: `Recipe ${
					isFavorite ? "marked as" : "unmarked from"
				} favorite`,
			});
		} catch (error) {
			// Log and handle errors during the favorite status update process
			console.error("Error updating favorite status:", error);
			res.status(500).json({ message: "Failed to update favorite status" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
