import Ingredients from './ingredients/ingredients'
import Instructions from './instructions/instructions'
import Description from '../description/description'
import { useState, useEffect } from 'react'
import { Button, ToggleButton } from '@mui/material'
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material'
import classNames from 'classnames'
import RecipeTags from '../tags/RecipeTags'

import RecipeBanner from './recipeBanner/recipeBanner'
import SideBar from './sideBar/sideBar'
import { getAllergens } from '@/lib/view-recipes'
import RecipeAllergens from '../allergens/allergens'
import Nutrition from './nutrition/nutrition'

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

  function toggleSideBarHandler() {
    setToggleSideBar(!toggleSideBar)
  }

  return (
    <>
      <div className="flex flex-row  p-5 justify-between">
        <div className="mr-5">
          <RecipeBanner
            images={recipe.images}
            prepTime={recipe.prep}
            cookTime={recipe.cook}
            servingAmount={recipe.servings}
          />
        </div>
        <div>
          <div className="text-center text-4xl font-sans ">{recipe.title}</div>
          <br />
          <div>
            <RecipeAllergens
              allergens={allergens}
              ingredients={recipe.ingredients}
            />
          </div>
          <p className="text-l text-center mt-5">
            <Description
              recipeId={recipe._id}
              description={recipe.description}
              // userName={username should be passed here}
            />
          </p>
          <div className="flex flex-row">
            <div className=" p-5 ">Cook time {recipe.cook} mins</div>
            <div className="  p-5 ">Preparation time {recipe.prep} mins</div>
            <div className=" p-5 ">Serves {recipe.servings}</div>
          </div>
          <div>
            <RecipeTags tags={recipe.tags} />
          </div>{' '}
          <div>
            <Nutrition nutritionList={recipe.nutrition} />
          </div>
        </div>

        <div className="flex flex-row">
          <Button onClick={toggleSideBarHandler}>
            {toggleSideBar ? (
              <KeyboardDoubleArrowRight />
            ) : (
              <KeyboardDoubleArrowLeft />
            )}
          </Button>
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
            <p className={` text-center font-bold md:block  xs:hidden `}>
              Ingredients
            </p>
            <Ingredients ingredients={recipe.ingredients} />
          </div>
          <div
            className={`md:block col-span-2 ${
              !toggleList ? 'xs:block' : 'xs:hidden'
            }`}
          >
            <p className={` text-center font-bold md:block xs:hidden`}>
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
