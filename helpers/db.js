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
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;

export const db = "devdb"
