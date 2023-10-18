import * as dotenv from "dotenv";
dotenv.config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.URI;

if (!uri) {
  console.error("env values are not present.");
  process.exit(1); 
}

export const db = "devdb"

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function fetchData() {
  try {
    await client.connect();

    const database = client.db(db);

    const collection = database.collection("recipes");

    const documents = await collection.find({}).limit(100).toArray();

    return documents;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export default fetchData;


export async function fetchRecipes() {
  const response = await fetch('/api/recipes');
  const data = await response.json();
  return data;
}

