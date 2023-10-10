import { MongoClient, ServerApiVersion } from 'mongodb';

let client;

try {
  if (!process.env.MONGODB_URI) {
    throw new Error("Environment variable MONGODB_URI is not defined.");
  }

  const uri = process.env.MONGODB_URI;

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}



export default client;
