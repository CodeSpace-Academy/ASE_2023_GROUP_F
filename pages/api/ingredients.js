import connectToDatabase from "@/database/database";

export default async function getIngredients(req, res) {
  if (req.method === "GET") {
    try {
      const database = await connectToDatabase();
      const collection = database.collection("recipes");

      const pipeline = [
        {
          $project: {
            newIngredients: "$ingredients",
          },
        },
        {
          $group: {
            _id: null,
            ingredientsArray: {
              $push: "$newIngredients",
            },
          },
        },
        {
          $unwind: {
            path: "$ingredientsArray",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $project: {
            _id: null,
            ingredientsData: {
              $objectToArray: "$ingredientsArray",
            },
          },
        },
        {
          $unwind: {
            path: "$ingredientsData",
          },
        },
        {
          $group: {
            _id: null,
            ingredientsArray: {
              $addToSet: "$ingredientsData.k",
            },
          },
        },
      ];

      const documents = await collection.aggregate(pipeline).toArray();

      res.status(200).json({ uniqueIngredients: documents });
    } catch (error) {
      console.log("Error fetching data: ", error);
      res.status(500).json({ message: "Data fetching failed " });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
