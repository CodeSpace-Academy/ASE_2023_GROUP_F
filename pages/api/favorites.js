import connectToDatabase from "../../database/database";

/**
 * API handler for fetching all favorite recipes.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

export default async function handler(req, res) {
	// Check if the HTTP method is GET
	if (req.method === "GET") {
		try {
			// Connect to the MongoDB database
			const database = await connectToDatabase();
			const collection = database.collection("recipes");

			// Find all recipes marked as favorites in the database and convert to an array
			const documents = await collection.find({ isFavorite: true }).toArray();

			// Get the number of favorite recipes
			const number = documents.length;

			// Respond with the fetched favorite recipes and their count
			res.status(200).json({ favoriteRecipes: documents, count: number });
		} catch (error) {
			console.error("Error fetching favorite recipes:", error);
			res.status(500).json({ message: "Favorite recipes fetching failed" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
