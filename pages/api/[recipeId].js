import {client, db} from "../../helpers/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const recipeId = req.query.recipeId
    console.log('api id =', recipeId)
    try {
      await client.connect();
      const database = client.db(db);
      const collection = database.collection("recipes");
      const documents = await collection.find({_id:recipeId}).toArray();

      res.status(200).json({ recipes: documents });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    } finally {
      await client.close();
    }
 } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}