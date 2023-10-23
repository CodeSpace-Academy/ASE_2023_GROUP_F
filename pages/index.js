import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";
import SearchBar from "@/components/search-functionality/search-bar";

function Home() {
  

  return (
    <div>
      <SearchBar/>
      <RecipeList />
    </div>
  );
}

export default Home;
