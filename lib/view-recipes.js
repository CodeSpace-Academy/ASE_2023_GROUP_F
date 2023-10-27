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

export async function getViewRecipes(startIndex = 0, pageSize = 48 , filter={}) {
	try {
		const skipCount = Math.floor(startIndex / pageSize);
		const newLimit = pageSize + skipCount * pageSize;

		const response = await fetch(`/api/filter?limit=${newLimit}&filter=${JSON.stringify(filter)}`);

		if (!response.ok) {
			throw new Error("API request failed with status: " + response.status);
		}

		const data = await response.json();

		const recipes = data.recipes.slice(startIndex);

		return { recipes, totalRecipes: data.count };
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
	const response = await fetch("/api/categories");

	if (!response.ok) {
		throw new Error("Could not fetch categories");
	}

	const categories = await response.json();

	return categories;
}

/**
 * Fetches allergens data from the server.
 *
 * @throws {Error} Throws an error if the request to fetch allergens fails.
 * @returns {Promise<Array>} A promise that resolves to an array of allergen items.
 * @async
 */
export async function getAllergens() {
	const response = await fetch("/api/allergens");

	if (!response.ok) {
		throw new Error("Could fetch allergens");
	}

	const allergens = await response.json();

	return allergens;
}

/**
 * Fetches id data from the server.
 *
 * @throws {Error} Throws an error if the request to fetch recipe fails.
 * @returns {Promise<Array>} A promise that resolves to an array of recipeId items.
 * @async
 */
export async function getSingleRecipe(id) {
	const response = await fetch(`/api/${id}`);

	if (!response.ok) {
		throw new Error("Could fetch recipe");
	}

	const singleRecipe = await response.json();

	return singleRecipe;
}
