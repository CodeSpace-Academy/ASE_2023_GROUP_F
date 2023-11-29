import connectToDatabase from "@/database/database";

/**
 * API handler for fetching unique ingredients from recipes.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 
 */

export default async function getIngredients(req, res) {
  // Check if the HTTP method is GET
  // Check if the HTTP method is GET
  if (req.method === "GET") {
    try {
      // Connect to the MongoDB database
      const database = await connectToDatabase();
      const collection = database.collection("recipes");

      // Define aggregation pipeline to fetch unique ingredients
      const pipeline = [
        {
          '$project': {
            'newIngredients': '$ingredients'
          }
        }, {
          '$group': {
            '_id': null,
            '_id': null,
            'ingredientsArray': {
              '$push': '$newIngredients'
            }
          }
        }, {
          '$unwind': {
            'path': '$ingredientsArray',
            'path': '$ingredientsArray',
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$project': {
            '_id': null,
            '_id': null,
            'ingredientsData': {
              '$objectToArray': '$ingredientsArray'
            }
          }
        }, {
          '$unwind': {
            'path': '$ingredientsData'
          }
        }, {
          '$group': {
            '_id': null,
            '_id': null,
            'ingredientsArray': {
              '$addToSet': '$ingredientsData.k'
            }
          }
        }
      ];

      // Execute aggregation pipeline and fetch unique ingredients
      const documents = await collection.aggregate(pipeline).toArray();

      // Respond with the fetched unique ingredients
      res.status(200).json({ uniqueIngredients: documents });
    } catch (error) {
      // Log and handle errors during the data fetching process
      console.log('Error fetching data: ', error);
      res.status(500).json({ message: "Data fetching failed " });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
