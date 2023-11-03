import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URI;
const dbName = "devdb";

if (!uri) {
  console.error("env values are not present.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  maxIdleTimeMS: 500,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }});

  async function connectToDatabase() {
    try {
      await client.connect();
  
      return client.db(dbName);
    } catch (error) {
      console.error("Failed To Connect to database", error);
    }
  
  }
  
  export default connectToDatabase;

