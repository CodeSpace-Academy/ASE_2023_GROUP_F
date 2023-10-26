import { client, dbName } from "./database";

async function connectToDatabase() {
    try {
      await client.connect();
  
      return client.db(dbName);
    } catch (error) {
      console.error("Failed To Connect to database", error);
    }
  
  }
  
  export default connectToDatabase;
  