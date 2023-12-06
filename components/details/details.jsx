/* eslint-disable react/jsx-curly-brace-presence */
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import StyleIcon from '@mui/icons-material/Style';
import Ingredients from './ingredients/ingredients';
import Instructions from './instructions/instructions';
import Description from '../description/description';
import RecipeTags from '../tags/RecipeTags';
import RecipeBanner from './recipeBanner/recipeBanner';
import { getAllergens } from '../../lib/view-recipes';
import RecipeAllergens from '../allergens/allergens';
import Nutrition from './nutrition/nutrition';
import CookIcon from '../icons/CookIcon';
import ServingIcon from '../icons/ServingIcon';
import PrepIcon from '../icons/PrepIcon';
import ScrollArrowButtons from '../UI/ScrollArrowButtons';

/**
 * Details Component
 *
 * @param {Object} props - Component properties
 * @param {Object} props.recipe - The recipe object containing various details.
 * @returns {JSX.Element} Details component
 */

function Details(props) {
  const { recipe, error } = props;

  const [toggleList, setToggleList] = useState(true);
  const [allergens, setAllergens] = useState([]);
  const [networkError, setNetworkError] = useState('');

  // Fetch allergens data from the server on component mount
  useEffect(() => {
    const callAllergens = async () => {
      try {
        const data = await getAllergens();
        setAllergens(data.allergens[0].allergens);
        return data.allergens[0].allergens;
      } catch (error) {
        setNetworkError(error);
        console.error(error);
      }
    };

    callAllergens();
  }, []);

  function toggleIngredients() {
    setToggleList(true);
  }

  function toggleInstructions() {
    setToggleList(false);
  }

  return (
    <>
      <div className="container grid flex-col justify-between gap-2 p-2 xs:grid-cols-1 md:grid-cols-3">
        <div className="p-4 mb-8 font-serif font-bold text-center lg:text-4xl md:text-2xl xs:grid-cols-1 xs:block md:hidden">{recipe?.title}</div>
        {/* RecipeBanner component displaying recipe images  */}
        <div className="md:mr-5 xs:col-span-1 md:col-span-1 top:10 ">
          <div className={`p-4 md:border-slate-300 md:border-solid md:border-2 md:p-4 md:m-4`}>
            <RecipeBanner images={recipe?.images} />
          </div>
        </div>

        {/* Details about the recipe, including title, allergens, and other information */}
        <div className="md:mt-0 md:ml-5 md:flex-grow xs:col-span-1 md:col-span-2">
          <div className={`p-6 mt-2 border-slate-300 border-solid border-2`}>
            <div className="font-serif text-4xl text-center xs:hidden md:block">{recipe?.title}</div>
            
            {/* Display description of the recipe */}
            <p className="container mt-1 text-sm text-center ">
              <Description recipeId={recipe?._id} description={recipe?.description} error={error} />
            </p>
          </div>

          <div className={`container mt-10 border-slate-300 border-solid border-2`}>
            <RecipeAllergens allergens={allergens} ingredients={recipe?.ingredients} />
          </div>

          {/* Display recipe details including cook time, prep time, and servings */}
          <div className="flex flex-col mt-5 md:flex-row md:space-x-4 md:space-y-0 md:border-slate-300 md:border-solid md:border-2 md:p-2">
            <div className={`flex items-center justify-center p-2 my-2 font-bold border-slate-300 border-solid border-2`}>
              <CookIcon fill="#000000" width="35" height="35" />
              Cook time {recipe?.cook} mins
            </div>

            <div className={`flex items-center justify-center p-2 my-2 font-bold border-slate-300 border-solid border-2`}>
              <PrepIcon fill="#000000" width="35" height="35" />
              Preparation time {recipe?.prep} mins
            </div>

            {recipe?.servings && (
              <div className={`flex items-center justify-center p-2 font-bold border-slate-300 border-solid border-2`}>
                <ServingIcon width="25" height="25" fill="#000000" />
                <p>
                  <strong>Serving:</strong> {recipe.servings}
                </p>
              </div>
            )}
          </div>

          {/* Display recipe tags */}
          <div className={`flex flex-row items-center mt-5 space-x-2 border-slate-300 border-solid border-2 p-2`}>
            <StyleIcon />
            <RecipeTags tags={recipe?.tags} networkError={networkError} />
          </div>

          {/* Display nutrition information */}
          <div className={`mt-5 border-slate-300 border-solid border-2 p-2`}>
            <p className="font-sans font-bold text-center lg:text-lg md:text-sm">Nutrition</p>
            <Nutrition nutritionList={recipe?.nutrition} />
          </div>
        </div>
      </div>

      {/* Responsive buttons for toggling between ingredients and instructions on small screens */}
      <div>
      <div className="block mb-5 space-x-2 text-center md:hidden rounded-md overflow-hidden">
        <Button
            value="ingredients"
            variant={toggleList ? 'outlined' : 'text'}
            onClick={toggleIngredients}
            style={{
              color: toggleList ? '#000000' : '#C3C7CC',
              backgroundColor: toggleList ? '#C3C7CC' : 'transparent',
              border: '1px solid #C3C7CC',
            }}
          >
            Ingredients
          </Button>
          <Button
            value="instructions"
            variant={!toggleList ? 'outlined' : 'text'}
            onClick={toggleInstructions}
            style={{
              color: !toggleList ? '#000000' : '#C3C7CC',
              backgroundColor: !toggleList ? '#C3C7CC' : 'transparent',
              border: '1px solid #C3C7CC',
            }}
          >
            Instructions
          </Button>
        </div>

        {/* Display ingredients or instructions based on the toggle state */}
        <div className="grid gap-2 md:grid-cols-3">
          <div className={`md:block col-span-1 mb-5 ${toggleList ? 'xs:block' : 'xs:hidden'}`}>
            <p className="text-lg font-bold text-center md:block xs:hidden">Ingredients</p>
            <Ingredients ingredients={recipe?.ingredients} />
          </div>

          <div className={`md:block col-span-2 ${!toggleList ? 'xs:block' : 'xs:hidden'}`}>
            <p className="text-lg font-bold text-center md:block xs:hidden">Instructions</p>
            <Instructions
              recipeId={recipe?._id}
              instructions={recipe?.instructions}
              description={recipe?.description}
              error={error}
            />
          </div>
        </div>
      </div>
      <ScrollArrowButtons />
    </>
  );
}

export default Details;
