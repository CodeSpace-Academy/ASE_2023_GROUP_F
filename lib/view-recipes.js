// /**
//  * Fetches a list of recipes from the API endpoint.
//  *
//  * This function is designed to retrieve a curated list of 100 recipes from the server.
//  * It is intended for use cases where a specific set of recipes is needed, such as displaying
//  * a recommended list on the user interface. The function handles the network request and
//  * error handling internally, providing a seamless experience for developers integrating it
//  * into their applications.
//  *
//  * @returns {Promise<Array>} A promise that resolves to an array containing the 100 curated recipes.
//  */
// export async function getViewRecipes() {
// 	try {
// 		const response = await fetch("/api/recipes");

// 		if (!response.ok) {
// 			throw new Error("Network response was not ok");
// 		}

// 		const data = await response.json();

// 		return data;
// 	} catch (error) {
// 		console.error("Error fetching recipes:", error);
// 	}
// }
