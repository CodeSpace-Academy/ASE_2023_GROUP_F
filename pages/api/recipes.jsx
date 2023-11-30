import connectToDatabase from "../../database/database";

/**
 * Handles incoming HTTP requests to the '/api/recipes' endpoint.
 * Supports GET and POST methods.
 *
 * @function handler
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * 
 * 
 * @returns {Promise<void>} - A Promise that resolves once the request is handled.
 */

export default async function handler(req, res) {

  // Handling GET requests to fetch recipes
  if (req.method === "GET") {
    try {
      // Connect to the database
      const database = await connectToDatabase();
      const collection = database.collection('recipes');

      // Parse 'limit' query parameter or set a default value
      const limit = parseInt(req.query.limit, 10) || 200;

      // Fetch recipes from the database with specified limit
      const documents = await collection.find({}).limit(limit).toArray();

      // Get the total count of recipes in the collection
      const number = await collection.countDocuments();

      res.status(200).json({ recipes: documents, count: number });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Data fetching failed' });
    }
  } else if (req.method === 'POST') {
    try {
      const database = await connectToDatabase();
      const collection = database.collection('recipes');

      const { recipeId, isFavorite } = req.body;
      await collection.updateOne({ _id: recipeId }, { $set: { isFavorite } });

      res.status(200).json({
        message: `Recipe ${isFavorite ? 'marked as' : 'unmarked from'} favorite`,
      });
    } catch (error) {
      console.error('Error updating favorite status:', error);
      res.status(500).json({ message: 'Failed to update favorite status' });
    }
    // Handling other HTTP methods
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
