import { client, db } from "../../helpers/db";

export default async function handler(req, res) {
  const filter = JSON.parse(req.query.filter)
  console.log('Filter category:', filter.category)

  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db(db);
      const collection = database.collection("recipes");

      const limit = parseInt(req.query.limit) || 200; 

      const documents = await collection.find(filter).limit(limit).toArray();
      const number = await collection.countDocuments();

      res.status(200).json({ recipes: documents, count: number });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    } finally {
      await client.close();
    }
  } else if (req.method === "POST") {
    try {
      await client.connect();
      const database = client.db(db);
      const collection = database.collection("recipes");

      const { recipeId, isFavorite } = req.body;
      await collection.updateOne(
        { _id: recipeId },
        { $set: { isFavorite: isFavorite } }
      );

      res.status(200).json({ message: `Recipe ${isFavorite ? "marked as" : "unmarked from"} favorite` });
    } catch (error) {
      console.error("Error updating favorite status:", error);
      res.status(500).json({ message: "Failed to update favorite status" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
