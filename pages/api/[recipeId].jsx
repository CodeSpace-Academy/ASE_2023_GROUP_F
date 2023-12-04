import connectToDatabase from "../../database/database"

/**
 * API handler for fetching a specific recipe by its ID.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

export default async function handler(req, res) {
  // Check if the HTTP method is GET
  if (req.method === "GET") {
     // Extract recipeId from the request
    const {recipeId} = req.query;

    try {
      // Connect to the MongoDB database
      const database = await connectToDatabase();
      const collection = database.collection("recipes");

      // Find the recipe in the database by its ID
      const documents = await collection.findOne({ _id: recipeId });

      // Respond with the found recipe
      res.status(200).json({ recipe: documents });
    } catch (error) {
        // Log and handle errors during the data fetching process
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    }
  } else {
     // Return a 405 Method Not Allowed status if the method is not GET
    res.status(405).json({ message: "Method not allowed" });
  }
}
