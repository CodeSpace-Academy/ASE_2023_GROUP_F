import * as dotenv from "dotenv";
dotenv.config();

// Require necessary modules
const { MongoClient, ServerApiVersion } = require("mongodb");

// Define the MongoDB connection string
const uri = process.env.URI;

if (!uri) {
  console.error("env values are not present.");
  process.exit(1); // Exit the application with an error code
}

// Create a MongoClient with the specified options
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});




 async function fetchData() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Get a reference to the database
    const database = client.db('devdb');

    // Get a reference to the collection you want to query
    const collection = database.collection('recipes'); 

    // Fetch data from the collection (e.g., find all documents)
    const documents = await collection.find({}).limit(100).toArray();

    return documents

    // Handle the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    // Close the MongoDB client when done
    if (client) {
      await client.close();
      console.log('Closed MongoDB connection');
    }
  }
  
}


export default fetchData;
