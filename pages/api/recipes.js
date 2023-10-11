import client from "../../helpers/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const database = client.db("devdb");
      const collection = database.collection("recipes");
      const documents = await collection.find({}).limit(100).toArray();

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
