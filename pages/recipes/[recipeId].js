import Details from "@/components/details/details";
import { useState, useEffect, useContext } from "react";
import RecipeSkeleton from "@/components/skeletonCard/detailPageSkeleton";
import { filterContext } from "../../components/search-functionality/filterContext";
import Head from "next/head";

function SingleRecipe({ recipeId }) {
	const { filters, setFiltes } = useContext(filterContext);
	const [recipe, setRecipe] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('filters in recipeId', filters)
    async function getRecipeById() {
      try {
        const result = await fetch(`/api/${recipeId}`);
        setRecipe(result.recipe);
        setLoading(false);
      } catch (error) {
        console.error(`something went wrong: ${error}`);
        setError('Error fetching recipe data.');
        setLoading(false); 
      }
    }

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

export async function getServerSideProps({ params }) {
	const { recipeId } = params;

	return {
		props: {
			recipeId,
		},
	};
}
