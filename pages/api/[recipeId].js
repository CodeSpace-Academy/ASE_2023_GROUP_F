import connectToDatabase from "../../database/database"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const {recipeId} = req.query;
    try {
      const database = await connectToDatabase();
      const collection = database.collection("recipes");
      const documents = await collection.findOne({ _id: recipeId });

      res.status(200).json({ recipe: documents });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
