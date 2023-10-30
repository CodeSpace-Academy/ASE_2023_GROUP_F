import connectToDatabase from "../../database/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const database = await connectToDatabase();
      const collection = database.collection("categories");
      const documents = await collection.find({}).toArray();

      res.status(200).json({ categories: documents });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
