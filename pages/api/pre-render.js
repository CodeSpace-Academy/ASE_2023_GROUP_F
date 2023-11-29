import connectToDatabase from "../../database/database";

/**
 * Filter Context
 * 
 * @typedef {Object} FilterContext
 * @property {Object} filters - The filters applied to recipes.
 * @property {Function} setFilters - Function to set the filters.
 * @property {Array} filteredRecipes - List of recipes after applying filters.
 * @property {Function} setFilteredRecipes - Function to set the filtered recipes.
 * @property {string} sortOption - The current sorting option for recipes.
 * @property {Function} setSortOption - Function to set the sorting option.
 * @property {Object} selectedFilters - The selected filters for categories, tags, ingredients, and instructions.
 * @property {Function} setSelectedFilters - Function to set the selected filters.
 * @property {boolean} noFiltersApplied - Flag indicating whether no filters are currently applied.
 * @property {Function} setNoFiltersApplied - Function to set the flag for no filters applied.
 * @property {string} searchTerm - The current search term for recipes.
 * @property {Function} setSearchTerm - Function to set the search term.
 */

export async function getRecipes(limit = 48) {
  try {
    // Connect to the MongoDB database
    const database = await connectToDatabase();
    const collection = database.collection("recipes");

    // Fetch recipes with the specified limit and convert to an array
    const documents = await collection.find({}).limit(limit).toArray();

     // Get the total count of recipes in the collection
    const number = await collection.countDocuments();

    // Return an object containing the fetched recipes and the total count
    return { recipes: documents, count: number };
  } catch (error) {
    // Log and throw an error if data fetching fails
    console.error("Error fetching data:", error);
    throw new Error("Data fetching failed");
  }
}
