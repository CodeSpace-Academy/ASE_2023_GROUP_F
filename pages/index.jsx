import { useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import RecipeList from '../components/recipe-collection/RecipeList';
import getRecipes from './api/pre-render';
import SearchBar from '../components/search-functionality/search-bar';
import { getViewRecipes } from '../lib/view-recipes';
import { filterContext } from '../components/search-functionality/filterContext';
import HandleError from '../components/error/Error';
import ScrollArrowButtons from '../components/UI/ScrollArrowButtons';
import Animation from '../components/skeletonCard/loadingAnimation/LoadingAnimation';

/**
 * Home component is the main page of the recipe app.
 *
 * It displays a list of recipes, allows users to apply filters, and handles
 * the fetching of initial data for static rendering.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.visibleRecipes - The initially visible list of recipes.
 * @param {number} props.count - The total count of recipes available.
 * @param {Object} filters - The filters to be applied.
 *
 * @returns {JSX.Element} - The rendered Home component.
 */

function Home(props) {
  const PAGE_SIZE = 48;
  const { visibleRecipes, count } = props;
  const { filters, filteredRecipes, setFilteredRecipes, sortOption } = useContext(filterContext);
  const [remainingRecipes, setRemainingRecipes] = useState(count);
  const [loading, setLoading] = useState(false);

  const handleApplyFilters = async (filters) => {
    try {
      setLoading(true);

      const filtering = await getViewRecipes(0, PAGE_SIZE, filters, sortOption);

      setFilteredRecipes(filtering?.recipes);
      setRemainingRecipes(filtering?.totalRecipes);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to handle filter changes and update the displayed recipes accordingly.
  useEffect(() => {
    const runLoad = async () => {
      try {
        if (JSON.stringify(filters) === '{}' && sortOption === '') {
          setFilteredRecipes(visibleRecipes);
        } else {
          await handleApplyFilters(filters, sortOption);
        }
      } finally {
        if (loading) {
          setLoading(false);
        }
      }
    };

    if (loading) {
      runLoad();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Foodie's Delight</title>
        <meta
          name="description"
          content="Welcome to Foodie's Delight, the ultimate companion for culinary enthusiasts and gastronomic adventurers! Unleash your inner chef and explore a world of delectable delights with our intuitive and feature-packed recipe app."
        />
      </Head>
      <SearchBar applyFilters={handleApplyFilters} appliedFilters={filters} count={remainingRecipes} />
      {loading && <Animation />}
      <ScrollArrowButtons />
      {!loading && (!filteredRecipes || filteredRecipes.length === 0) && visibleRecipes ? (
        <HandleError>No recipes found!! 😢</HandleError>
      ) : (
        <RecipeList
          visibleRecipes={filteredRecipes}
          count={remainingRecipes}
          appliedFilters={filters}
          setRecipes={setFilteredRecipes}
        />
      )}
    </div>
  );
}

/**
 * getStaticProps function for Next.js to fetch and pre-render data for the Home component.
 *
 * @async
 * @function
 * @returns {Object} - The props to be passed to the Home component.
 */
export async function getStaticProps() {
  try {
    // Fetching recipes and count using the getRecipes API
    const { recipes, count } = await getRecipes(48);
    return {
      props: {
        visibleRecipes: recipes,
        count,
      },
      revalidate: 600,
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch data',
      },
    };
  }
}

export default Home;
