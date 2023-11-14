import connectToDatabase from "@/database/database";


export default async function handler(req, res) {
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
  ]


  if (req.method === "GET") {
    try{
      const database = await connectToDatabase();
      const collection = database.collection("recipes")
      const documents = await collection.aggregate(pipeline).toArray();
  
      res.status(200).json({ ingredients: documents});
    }catch(error){
      console.error("Error fetching data: ", error);
      res.status(500).json({ message: "Data fetching failed"});
    }
  }else{
    res.status(405).json({ message: "Method not allowed"});
  }
}
