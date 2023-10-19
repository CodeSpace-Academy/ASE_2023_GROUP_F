import { client, db } from "../../../helpers/db";

export default async function handler(req, res) {
  console.log("update recipe api");
  if (req.method === "PATCH") {
    const recipeId = req.query.recipeId;
    const updatedData = req.body;
   
    try {
      await client.connect();
      const database = client.db(db);
      const collection = database.collection("recipes");
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
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
