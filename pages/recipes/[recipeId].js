import Details from "@/components/details/details";
import { getSingleRecipe } from "@/lib/view-recipes";
import { useState, useEffect, useContext } from "react";
import RecipeSkeleton from "@/components/skeletonCard/detailPageSkeleton";
import { filterContext } from "../../components/search-functionality/filterContext";
import Head from "next/head";

/**
 * SingleRecipe component renders details of a single recipe.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.recipeId - The ID of the recipe to be displayed.
 */

function SingleRecipe({ recipeId }) {
	const { filters, setFiltes } = useContext(filterContext);
	const [recipe, setRecipe] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	// Effect hook to fetch recipe data when the component mounts or when recipeId changes
	useEffect(() => {
		console.log("filters in recipeId", filters);

		//  Fetch recipe by ID
		async function getRecipeById() {
			try {
				const result = await getSingleRecipe(recipeId);
				setRecipe(result.recipe);
				setLoading(false);
			} catch (error) {
				console.error(`something went wrong: ${error}`);
				setError("Error fetching recipe data.");
				setLoading(false);
			}
		}

		// Call the fetch function
		getRecipeById();
	}, [recipeId]);

	return (
		<>
			<Head>
				<title>{recipe?.title}</title>
				<meta name="description" content={recipe?.description} />
			</Head>
			{loading ? <RecipeSkeleton /> : <Details recipe={recipe} error={error} />}
		</>
	);
}

export default SingleRecipe;

/**
 * getServerSideProps is a Next.js function that runs server-side and fetches data for the component.
 *
 * @param {Object} context - The context object provided by Next.js.
 * @param {Object} context.params - The parameters provided in the URL.
 * @param {string} context.params.recipeId - The ID of the recipe to be displayed.
 * @returns {Object} - The props to be passed to the component.
 */

export async function getServerSideProps({ params }) {
	// Destructure the recipeId from the params object
	const { recipeId } = params;

	return {
		props: {
			recipeId,
		},
	};
}
