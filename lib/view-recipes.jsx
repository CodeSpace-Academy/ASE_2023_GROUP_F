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
	sort = {}
) {
	try {
		const skipCount = Math.floor(startIndex / pageSize);
		const newLimit = pageSize + skipCount * pageSize;

		const response = await fetch(
			`/api/filter?limit=${newLimit}&filter=${JSON.stringify(filter)}&sort=${JSON.stringify(sort)}`,
		);

		if (!response.ok) {
			console.error(`API request failed with status: ${  response.status}`);
		}

		const data = await response.json();

		const recipes = data.recipes.slice(startIndex);

		return { recipes, totalRecipes: data.count };
	} catch (error) {
		console.error(`Error fetching recipes: ${  error.message}`);
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
		console.error("Could not fetch categories");
	}

	const categories = await response.json();

	return categories;
}

/**
 * Fetches Ingredients data from the server.
 *
 * @throws {Error} Throws an error if the request to fetch ingredients fails.
 * @returns {Promise<Array>} A promise that resolves to an array of ingredients items.
 * @async
 */
export async function getIngredients() {
	const response = await fetch("/api/ingredients");

	if (!response.ok) {
		throw new Error("Could not fetch ingredients");
	}

	const ingredients = await response.json();

	return ingredients;
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
		console.error("Could fetch allergens");
	}

	const allergens = await response.json();

	return allergens;
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

export async function getFavoriteRecipes() {
	try {
		const response = await fetch("/api/favorites");

		if (!response.ok) {
			console.error(`API request failed with status: ${  response.status}`);
		}

		const data = await response.json();

		return data
	} catch (error) {
		console.error(`Error fetching favorite recipes: ${  error.message}`);
	}
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
		console.error("Could not fetch recipe");
	}

	const singleRecipe = await response.json();

	return singleRecipe;
}
