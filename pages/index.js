import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";
import { getRecipes } from "./api/pre-render"
import SearchBar from "@/components/search-functionality/search-bar";


function Home(props) {

  const {visibleRecipes , count} = props

  return (
    <div>
      <SearchBar/>
      <RecipeList visibleRecipes={visibleRecipes} count={count} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const { recipes, count } = await getRecipes(48);
    return {
      props: {
        visibleRecipes:recipes,
        count,
      },
      revalidate:60
    };
  } catch (error) {
    return {
      props: {
        error: "Failed to fetch data",
      },
    };
  }
}




export default Home;
