import {getFavoriteRecipes} from "../../database/database";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const documents = await getFavoriteRecipes()
			const result = await documents.json()
			const number = result.length;

			res.status(200).json({ favoriteRecipes: documents , count: number });
		} catch (error) {
			console.error("Error fetching favorite recipes:", error);
			res.status(500).json({ message: "Favorite recipes fetching failed" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
