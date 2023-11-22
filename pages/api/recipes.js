import { getViewRecipes } from "../../database/database";

export default async function handler(req, res) {

  if (req.method === "GET") {
    try {
      const limit = parseInt(req.query.limit) || 200;

      const documents = await getViewRecipes(0, limit, {}, {})
      const number = documents.number

      res.status(200).json({ recipes: documents, count: number });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    }
  } else if (req.method === "POST") {
    try {

      const { recipeId, isFavorite } = req.body;
			await getViewRecipes(0, {}, {}, {}, recipeId, isFavorite);

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
