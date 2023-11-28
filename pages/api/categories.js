import connectToDatabase from "../../database/database";

/**
 * Get Categories API Handler
 *
 * This API handler is responsible for fetching all categories from the database.
 *
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If there is an error fetching the category data.
 */

export default async function handler(req, res) {
  // Check if the HTTP method is GET
  if (req.method === "GET") {
    try {
      // Connect to the database
      const database = await connectToDatabase();
      const collection = database.collection("categories");

       // Fetch all categories from the database
      const documents = await collection.find({}).toArray();

      // Respond with the fetched categories
      res.status(200).json({ categories: documents });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
