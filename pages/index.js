import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";


function Home() {

  return (
    <div>
      <Head>
      <link
          href="https://fonts.googleapis.com/css2?family=Italianno&display=swap"
          rel="stylesheet"
        />
      </Head>
      <RecipeList />
    </div>
  )
}

export default Home;



