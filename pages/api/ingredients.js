/**
 * Get Unique Ingredients API Handler
 *
 * This API handler is responsible for fetching unique ingredients from the recipes in the database.
 *
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} If there is an error fetching ingredient data.
 */

import connectToDatabase from "@/database/database";

export default async function getIngredients(req, res) {
  // Check if the HTTP method is GET
  if (req.method === "GET") {
    try {
      // Connect to the database
      const database = await connectToDatabase();
      const collection = database.collection("recipes");

      // Define aggregation pipeline stages for fetching unique ingredients
      const pipeline = [
        {
          '$project': {
            'newIngredients': '$ingredients'
          }
        }, {
          '$group': {
            '_id': null,
            'ingredientsArray': {
              '$push': '$newIngredients'
            }
          }
        }, {
          '$unwind': {
            'path': '$ingredientsArray',
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$project': {
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
            'ingredientsArray': {
              '$addToSet': '$ingredientsData.k'
            }
          }
        }
      ];

      // Execute aggregation and fetch documents
      const documents = await collection.aggregate(pipeline).toArray();

      res.status(200).json({ uniqueIngredients: documents });
    } catch (error) {
      console.log('Error fetching data: ', error);
      res.status(500).json({ message: "Data fetching failed " });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
