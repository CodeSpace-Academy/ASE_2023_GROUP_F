/**
 * Get Favorite Recipes API Handler
 *
 * This API handler is responsible for fetching favorite recipes from the database.
 *
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If there is an error fetching the favorite recipe data.
 */

import connectToDatabase from "../../database/database";

export default async function handler(req, res) {
	 // Check if the HTTP method is GET
	if (req.method === "GET") {
		try {
			const database = await connectToDatabase();
			const collection = database.collection("recipes");

			// Fetch favorite recipes from the database where isFavorite is true
			const documents = await collection.find({ isFavorite: true }).toArray();
			const number = documents.length;

			// Respond with the fetched favorite recipes and their count
			res.status(200).json({ favoriteRecipes: documents , count: number });
		} catch (error) {
			 // Log and respond with an error message if there is an error fetching the data
			console.error("Error fetching favorite recipes:", error);
			res.status(500).json({ message: "Favorite recipes fetching failed" });
		}
	} else {
		// Respond with an error message if the HTTP method is not allowed
		res.status(405).json({ message: "Method not allowed" });
	}
}
