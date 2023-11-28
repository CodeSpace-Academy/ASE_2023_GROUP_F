import connectToDatabase from "../../database/database"

/**
 * Get Recipe API Handler
 *
 * This API handler is responsible for fetching a recipe from the database by its ID.
 *
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If there is an error fetching the recipe data.
 */

export default async function handler(req, res) {
  if (req.method === "GET") {
    const recipeId = req.query.recipeId;
    try {
      const database = await connectToDatabase();
      const collection = database.collection("recipes");
      const documents = await collection.findOne({ _id: recipeId });

      res.status(200).json({ recipe: documents });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
