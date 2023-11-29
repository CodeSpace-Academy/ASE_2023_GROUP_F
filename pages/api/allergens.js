import connectToDatabase from "../../database/database";

/**
 * API handler for fetching all allergens.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

export default async function handler(req, res) {
  // Check if the HTTP method is GET
  if (req.method === "GET") {
    try {
      // Connect to the MongoDB database
      const database = await connectToDatabase();
      const collection = database.collection("allergens");

      // Find all allergens in the database and convert to an array
      const documents = await collection.find({}).toArray();

      // Respond with the fetched allergens
      res.status(200).json({ allergens: documents });
    } catch (error) {
      // Log and respond with an error message if there is an error fetching the data
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Data fetching failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
