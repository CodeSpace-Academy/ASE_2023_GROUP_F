import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";

function Home(props) {
  const { viewRecipes } = props;

  return (
    <div>
      <RecipeList />
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  try {
    const url = 'http://localhost:3000/api/recipes'
    const response = await fetch(url);
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