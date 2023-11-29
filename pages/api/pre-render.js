import connectToDatabase from "../../database/database";

/**
 * Function for fetching recipes with an optional limit.
 *
 * @async
 * @function
 * @param {number} [limit=48] - The maximum number of recipes to fetch. Default is 48.
 * @returns {Promise<{ recipes: Object[], count: number }>} A promise that resolves to an object containing an array of recipes and the total count.
 * @throws {Error} Throws an error if data fetching fails.
 */

export async function getRecipes(limit = 48) {
  try {
    // Connect to the MongoDB database
    const database = await connectToDatabase();
    const collection = database.collection("recipes");

    // Fetch recipes with the specified limit and convert to an array
    const documents = await collection.find({}).limit(limit).toArray();

     // Get the total count of recipes in the collection
    const number = await collection.countDocuments();

    // Return an object containing the fetched recipes and the total count
    return { recipes: documents, count: number };
  } catch (error) {
    // Log and throw an error if data fetching fails
    console.error("Error fetching data:", error);
    throw new Error("Data fetching failed");
  }
}
