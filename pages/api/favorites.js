import connectToDatabase from "../../database/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const database = await connectToDatabase();
      const collection = database.collection("recipes");
      const documents = await collection.find({ isFavorite: true }).toArray();

      console.log(documents)

      res.status(200).json({ favoriteRecipes: documents });
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
      res.status(500).json({ message: "Favorite recipes fetching failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
