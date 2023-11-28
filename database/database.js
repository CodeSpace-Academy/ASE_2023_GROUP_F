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
  },
});

async function connectToDatabase() {
  try {
    await client.connect();

    return client.db(dbName);
  } catch (error) {
    console.error("Failed To Connect to database", error.message);
  }
}

/**
 * Fetches a list of recipes from the API endpoint.
 *
 * This function is designed to retrieve a curated list of 100 recipes from the server.
 * It is intended for use cases where a specific set of recipes is needed, such as displaying
 * a recommended list on the user interface. The function handles the network request and
 * error handling internally, providing a seamless experience for developers integrating it
 * into their applications.
 *
 * @throws {Error} If the network response is not successful or if there is an error fetching data from the API.
 *
 * @returns {Promise<Array>} A promise that resolves to an array containing the 100 curated recipes.
 *
 */

export async function getViewRecipes(
  startIndex = 0,
  pageSize = 48,
  filter = {},
  sort = {},
  id = '',
  $set = ""
) {
  try {
    const database = await connectToDatabase();
    const collection = database.collection("recipes");

    const agg = [];
    const queryFilter = {};

    const page = Math.floor(startIndex / pageSize);
    const skip = page * pageSize;

    if(id && $set){
      await collection.updateOne(
				{ _id: recipeId },
				{ $set: { isFavorite: isFavorite } },
			);
    }

    if (filter.category) {
      queryFilter.category = {
        $regex: new RegExp(filter.category, "i"),
      };
    }

    if (filter.tags && Array.isArray(filter.tags)) {
      queryFilter.tags = {
        $in: filter.tags.map((tag) => new RegExp(tag, "i")),
      };
    } else if (filter.tags) {
      queryFilter.tags = {
        $regex: new RegExp(filter.tags, "i"),
      };
    }

    if (filter.title) {
      queryFilter.title = {
        $regex: new RegExp(filter.title, "i"),
      };
    }

    if (filter.ingredients) {
      queryFilter[`ingredients.${filter.ingredients}`] = { $exists: true };
    }

    if (filter.instructions) {
      queryFilter[`instructions.${filter.instructions}`] = { $exists: false };
    }

    let querySort = {};

    if (sort === "prep ASC") {
      querySort.prep = 1;
    } else if (sort === "prep DESC") {
      querySort.prep = -1;
    }

    if (sort === "cook ASC") {
      querySort.cook = 1;
    } else if (sort === "cook DESC") {
      querySort.cook = -1;
    }

    if (sort === "date ASC") {
      querySort.published = 1;
    } else if (sort === "date DESC") {
      querySort.published = -1;
    }

    if (sort === "instructions ASC") {
      querySort.instructions = 1;
    } else if (sort === "instructions DESC") {
      querySort.instructions = -1;
    }

    if (sort === "instructions ASC" || sort === "instructions DESC") {
      const sortOrder = sort === "instructions ASC" ? 1 : -1;

      agg.push(
        {
          $addFields: {
            instructionsLength: { $size: "$instructions" },
          },
        },
        {
          $sort: {
            instructionsLength: sortOrder,
          },
        },
        {
          $project: {
            instructionsLength: 0,
          },
        }
      );
    } else {
      if (JSON.stringify(querySort) !== "{}") {
        agg.push({ $sort: querySort });
      }
    }

    if (JSON.stringify(queryFilter) !== "{}") {
      agg.push({ $match: { ...queryFilter } });
    }
    agg.push({ $skip: skip})
    agg.push({ $limit: pageSize });

    if(agg != [] || queryFilter != {}){
      const documents = await collection.aggregate(agg).toArray();
      const number = await collection.countDocuments(queryFilter);

      return { documents, number };
    }else{
      const documents = await collection.find({}).limit(pageSize).toArray();
      const number = await collection.countDocuments();

      return { documents, number };
    };
  } catch (error) {
    throw new Error("Error fetching recipes: " + error.message);
  }
}

/**
 * Fetches categories data from the server.
 *
 * @throws {Error} Throws an error if the request to fetch categories fails.
 * @returns {Promise<Array>} A promise that resolves to an array of category items.
 * @async
 */
export async function getCategories() {
  try {
    const database = await connectToDatabase();
    const collection = database.collection("categories");
    const documents = await collection.find({}).toArray();

    return documents;
  } catch (error) {
    console.error("Error Fetching data: ", error.message);
  }
}

/**
 * Fetches allergens data from the server.
 *
 * @throws {Error} Throws an error if the request to fetch allergens fails.
 * @returns {Promise<Array>} A promise that resolves to an array of allergen items.
 * @async
 */
export async function getAllergens() {
  try {
    const database = await connectToDatabase();
    const collection = database.collection("allergens");
    const documents = await collection.find({}).toArray();

    return documents;
  } catch (error) {
    console.error("Error fetching data: ", error.message);
  }
}

/**
 * Fetches favorite recipes from the API.
 *
 * This function makes an asynchronous request to the "/api/recipes" endpoint
 * to retrieve recipes marked as favorite. It filters the response data to
 * include only the favorite recipes.
 *
 * @throws {Error} If the API request fails or if there's an error parsing the response.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of favorite recipe objects.
 *
 * @async
 * @function
 * @name getFavoriteRecipes
 * @memberof module:RecipeAPI
 */

/**
 * Fetches favorite recipes from the API.
 *
 * This function makes an asynchronous request to the "/api/recipes" endpoint
 * to retrieve recipes marked as favorite. It filters the response data to
 * include only the favorite recipes.
 *
 * @throws {Error} If the API request fails or if there's an error parsing the response.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of favorite recipe objects.
 *
 * @async
 * @function
 * @name getFavoriteRecipes
 * @memberof module:RecipeAPI
 */

export async function getFavoriteRecipes() {
  try {
    const database = await connectToDatabase();
    const collection = database.collection("recipes");
    const documents = await collection.find({ isFavorite: true }).toArray();
    const number = documents.length

    return {documents, number};
  } catch (error) {
    throw new Error("Error fetching favorite recipes: " + error.message);
  }
}

/**
 * Fetches id data from the server.
 *
 * @throws {Error} Throws an error if the request to fetch recipe fails.
 * @returns {Promise<Array>} A promise that resolves to an array of recipeId items.
 * @async
 */
export async function getSingleRecipe(id = "", $set = "") {
  try {
    const database = await connectToDatabase();
    const collection = database.collection("recipes");
    if (id && $set != "") {
      const documents = await collection.updateOne({ _id: id }, { _set: $set });
      return documents;
    }

    if (id) {
      const documents = await collection.findOne({ _id: id });
      return documents;
    }

  } catch (error) {
    throw new Error("Could fetch recipe", error.message);
  }
}

export default connectToDatabase;
