import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import RecipeList from "../components/recipe-collection/RecipeList";
import { getRecipes } from "./api/pre-render";
import SearchBar from "@/components/search-functionality/search-bar";
import { getViewRecipes } from "@/lib/view-recipes";
import SearchInput from '../components/keaSearchInput/SearchInput';
import { FilterContext } from '../storage/filterContext'; 

const PAGE_SIZE = 48;

function Home({ visibleRecipes, count }) {
  const { filteredRecipes, setFilteredRecipes, setFilters } = useContext(FilterContext); 
  const [filteredRecipesCount, setFilteredRecipesCount] = useState(count);
  const [appliedFilters, setAppliedFilters] = useState({});

  useEffect(() => {
    setFilteredRecipes(visibleRecipes);
  }, [visibleRecipes]);

  const handleApplyFilters = async (filters, sort) => {
    const filtering = await getViewRecipes(0, PAGE_SIZE, filters, sort);
    setFilteredRecipes(filtering.recipes);
    setFilteredRecipesCount(filtering.totalRecipes);
    setFilters(filters); 
  };

  console.log("recipes for you",visibleRecipes)

  return (
    <div>
      <SearchBar applyFilters={handleApplyFilters} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />
      <SearchInput />
      <RecipeList
        visibleRecipes={filteredRecipes}
        count={filteredRecipesCount}
        appliedFilters={appliedFilters}
        setRecipes={setFilteredRecipes}
      />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const { recipes, count } = await getRecipes(48);
    return {
      props: {
        visibleRecipes: recipes,
        count,
      },
      revalidate: 60,
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
