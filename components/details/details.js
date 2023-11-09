import Ingredients from './ingredients/ingredients'
import Instructions from './instructions/instructions'
import Description from '../description/description'
import { useState, useEffect } from 'react'
import { Button, ToggleButton } from '@mui/material'
import classNames from 'classnames'
import RecipeTags from '../tags/RecipeTags'
import RecipeBanner from './recipeBanner/recipeBanner'
import { getAllergens } from '@/lib/view-recipes'
import RecipeAllergens from '../allergens/allergens'
import Nutrition from './nutrition/nutrition'
import StyleIcon from '@mui/icons-material/Style';
import CookIcon from "../icons/CookIcon";
import ServingIcon from "../icons/ServingIcon";
import PrepIcon from "../icons/PrepIcon";

function Details(props) {
  const { recipe } = props

  const [toggleList, setToggleList] = useState(true)
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const [allergens, setAllergens] = useState([])

  useEffect(() => {
    const callAllergens = async () => {
      try {
        const data = await getAllergens()
        setAllergens(data.allergens[0].allergens)
        return data.allergens[0].allergens
      } catch (error) {
        console.error(error)
      }
    }

    callAllergens()
  }, [])

  function toggleIngredients() {
    setToggleList(true)
  }

  function toggleInstructions() {
    setToggleList(false)
  }

  const wrapping = classNames('bg-gray-300 p-5 right-0 relative', {
    ['w-10']: !toggleSideBar,
  })

  return (
    <>
      <div className="flex flex-row p-5 justify-between">
        <div className="mr-5">
          <RecipeBanner images={recipe.images} />
        </div>
        <div>
          <div className="text-center text-4xl font-serif">{recipe.title}</div>
          <br />
          <div>
            <RecipeAllergens
              allergens={allergens}
              ingredients={recipe.ingredients}
            />
          </div>
          <p className="text-lg text-center mt-5">
            <Description
              recipeId={recipe._id}
              description={recipe.description}
              // userName={username should be passed here}
            />
          </p>

          <div className="flex space-x-4">
            <div 
            className=" flex items-center justify-center p-4 my-4 font-bold bg-gray-200 rounded-xl" >
              <CookIcon fill="#000000" width="35" height="35" />
              Cook time {recipe.cook} mins
              </div>

            <div 
            className=" flex items-center justify-center p-4 my-4 font-bold bg-gray-200 rounded-xl">
              <PrepIcon fill="#000000" width="35" height="35" />
              Preparation time {recipe.prep} mins
              </div>

            <div 
            className=" flex items-center justify-center p-4 my-4 font-bold bg-gray-200 rounded-xl">
              <ServingIcon width="25" height="25" fill="#2B5B95" />
              Serves {recipe.servings}
              </div>
          </div>

          <div >
            <div className='flex justify-center'>
            <StyleIcon className=''/>
            <p className="font-sans font-bold ">Tags</p>
            </div>
            <RecipeTags tags={recipe.tags} />
          </div>{' '}

          <div >
            <p className="text-center font-sans font-bold p-5">Nutrition</p>
            <Nutrition nutritionList={recipe.nutrition} />
          </div>
        </div>
      </div>

      <div>
        <div class="block md:hidden ">
          <Button
            value="ingredients"
            variant={toggleList ? 'outlined' : 'text'}
            onClick={toggleIngredients}
          >
            ingredients
          </Button>
          <Button
            value="ingredients"
            variant={!toggleList ? 'outlined' : 'text'}
            onClick={toggleInstructions}
          >
            instructions
          </Button>
        </div>
        <div class="grid gap-2 md:grid-cols-3 ">
          <div
            className={`md:block col-span-1 ${
              toggleList ? 'xs:block' : 'xs:hidden'
            }`}
          >
            <p className={` text-center text-lg font-bold md:block  xs:hidden `}>
              Ingredients
            </p>
            <Ingredients ingredients={recipe.ingredients} />
          </div>
          <div
            className={`md:block col-span-2 ${
              !toggleList ? 'xs:block' : 'xs:hidden'
            }`}
          >
            <p className={` text-center text-lg font-bold md:block xs:hidden`}>
              Instructions
            </p>
            <Instructions
              recipeId={recipe._id}
              instructions={recipe.instructions}
              description={recipe.discription}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Details
