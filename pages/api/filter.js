import connectToDatabase from "../../database/database";

export default async function handler(req, res) {
	const filter = JSON.parse(req.query.filter);
	const title = filter.title
	console.log(filter.title, "filter.instructions");
	const limit = parseInt(req.query.limit) || 200;

	if (req.method === "GET") {
		try {
			const database = await connectToDatabase();
			const collection = database.collection("recipes");

			const queryFilter = {};

			if (filter.category) {
				queryFilter.category = {
					$regex: new RegExp(filter.category, "i"),
				};
			}

			if (filter.tags && Array.isArray(filter.tags)) {
				queryFilter.tags = {
					$in: filter.tags.map((tag) => new RegExp(tag, "i")),
				};
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
				queryFilter[`instructions.${filter.instructions}`] = { $exists: true };
			}

			const documents = await collection
				.find(queryFilter)
				.limit(limit)
				.toArray();

			console.log("queryFilter", queryFilter);

			const number = await collection.countDocuments(queryFilter);

			res.status(200).json({ recipes: documents, count: number });
		} catch (error) {
			console.error("Error fetching data:", error);
			res.status(500).json({ message: "Data fetching failed" });
		}
	} else if (req.method === "POST") {
		try {
			const database = await connectToDatabase();
			const collection = database.collection("recipes");

			const { recipeId, isFavorite } = req.body;
			await collection.updateOne(
				{ _id: recipeId },
				{ $set: { isFavorite: isFavorite } },
			);

			res.status(200).json({
				message: `Recipe ${
					isFavorite ? "marked as" : "unmarked from"
				} favorite`,
			});
		} catch (error) {
			console.error("Error updating favorite status:", error);
			res.status(500).json({ message: "Failed to update favorite status" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
