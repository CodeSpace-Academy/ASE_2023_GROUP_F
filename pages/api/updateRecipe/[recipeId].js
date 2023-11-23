/**
 * Update Recipe API Handler
 *
 * This API handler is responsible for updating a recipe in the database.
 *
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If there is an error updating the recipe.
 * 
 * @returns {void}
 */

import connectToDatabase from "../../../database/database";

export default async function handler(req, res) {
  console.log("update recipe api");
  if (req.method === "PATCH") {
    // Extract recipeId and updatedData from the request
    const recipeId = req.query.recipeId;
    const updatedData = req.body;

    try {
      // Connect to the database
      const database = await connectToDatabase()
      const collection = database.collection("recipes");

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
      console.error("Error updating data:", error);
      res.status(500).json({ message: "Data update failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
