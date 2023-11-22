import {getSingleRecipe} from "../../database/database"

export default async function handler(req, res) {
  console.log("API reached++++++++++")
  if (req.method === "GET") {
    const recipeId = req.query.recipeId;
    console.log("Recipe ID++++++++",recipeId);
    try {
      const documents = await getSingleRecipe(recipeId)

      res.status(200).json({ recipe: documents });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
