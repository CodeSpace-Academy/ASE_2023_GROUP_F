import connectToDatabase from '../../database/database';

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

export default async function getRecipes(limit = 48) {
  try {
    const database = await connectToDatabase();
    const collection = database.collection('recipes');

    const documents = await collection.find({}).limit(limit).toArray();
    const number = await collection.countDocuments();

    return { recipes: documents, count: number };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Data fetching failed');
  }
}
