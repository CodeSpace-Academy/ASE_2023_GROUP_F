import {getSingleRecipe} from "../../../database/database";

export default async function handler(req, res) {
  console.log("update recipe api");
  if (req.method === "PATCH") {
    const recipeId = req.query.recipeId;
    const updatedData = req.body;
   
    try {
      
      const documents = await getSingleRecipe(recipeId, updatedData)

      if (documents.ok === 1) {
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
