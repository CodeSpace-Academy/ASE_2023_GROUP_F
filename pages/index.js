import { getViewRecipes } from "@/lib/view-recipes";
import RecipeList from "../components/recipe-collection/RecipeList";

function Home(props) {
  const { viewRecipes } = props;

  return (
    <div>
      <RecipeList viewRecipes={viewRecipes} />
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  try {
    const response = await fetch('http://localhost:3000//api/recipes');
    const data = await response.json();
    const recipes = data.recipes;

    return {
      props: {
        viewRecipes: recipes,
      },
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return {
      props: {
        viewRecipes: null, 
      },
    };
  }
}

