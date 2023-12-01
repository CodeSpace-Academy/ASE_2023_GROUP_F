import connectToDatabase from "../../../database/database";

/**
 * API handler for updating a recipe.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */

export default async function handler(req, res) {
  console.log("update recipe api");

  // Check if the HTTP method is PATCH
  if (req.method === "PATCH") {
    // Extract recipeId and updatedData from the request
    // Extract recipeId and updatedData from the request
    const recipeId = req.query.recipeId;
    const updatedData = req.body;


    try {
      // Connect to the MongoDB database
      const database = await connectToDatabase()
      const collection = database.collection("recipes");

      // Update the recipe in the database

      // Update the recipe in the database
      const result = await collection.updateOne(
        { _id: recipeId },
        { $set: updatedData }
      );

      if (result.ok === 1) {
        res.status(200).json({ message: "Recipe updated successfully" });
      } else {
        res.status(400).json({ message: "Recipe not found or not updated" });
      }
    } catch (error) {
      // Log and handle errors during the update process
      console.error("Error updating data:", error);
      res.status(500).json({ message: "Data update failed" });
    }
  } else {
    // Return a 405 Method Not Allowed status if the method is not PATCH
    res.status(405).json({ message: "Method not allowed" });
  }
}
