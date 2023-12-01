import connectToDatabase from "../../database/database";

/**
 * API handler for fetching and updating recipes.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

export default async function handler(req, res) {
  // Check if the HTTP method is GET or POST
  if (req.method === "GET") {
    try {
      // Connect to the MongoDB database
      const database = await connectToDatabase();
      const collection = database.collection("recipes");

      // Parse limit from the request query parameters, default to 200
      const limit = parseInt(req.query.limit) || 200;

      // Fetch recipes with the specified limit and convert to an array
      const documents = await collection.find({}).limit(limit).toArray();

      // Get the total count of recipes in the collection

      // Get the total count of recipes in the collection
      const number = await collection.countDocuments();

      // Respond with the fetched recipes and the total count
      res.status(200).json({ recipes: documents, count: number });
    } catch (error) {
      // Log and handle errors during the data fetching process
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    }
  } else if (req.method === "POST") {
    // Handle recipe update (marking/unmarking as favorite)
    try {
      const database = await connectToDatabase();
      const collection = database.collection("recipes");

      // Extract recipeId and isFavorite from the request body
      const { recipeId, isFavorite } = req.body;

      // Update the isFavorite field for the specified recipe
      await collection.updateOne(
        { _id: recipeId },
        { $set: { isFavorite: isFavorite } }
      );

      // Respond with a success message
      res.status(200).json({
        message: `Recipe ${isFavorite ? "marked as" : "unmarked from"
          } favorite`,
      });
    } catch (error) {
      // Log and handle errors during the favorite status update process
      console.error("Error updating favorite status:", error);
      res.status(500).json({ message: "Failed to update favorite status" });
    }
    // Handling other HTTP methods
  } else {
    // Return a 405 Method Not Allowed status if the method is not GET or POST
    res.status(405).json({ message: "Method not allowed" });
  }
}
