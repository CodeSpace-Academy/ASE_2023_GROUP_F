import Ingredients from "./ingredients/ingredients";
import Instructions from "./instructions/instructions";
import { useState } from "react";
import { Button, ToggleButton } from "@mui/material";
import {KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight} from '@mui/icons-material';
import classNames from "classnames";

import RecipeBanner from "./recipeBanner/recipeBanner";
import SideBar from "./sideBar/sideBar";

function Details(props) {
	const { recipe } = props;

	const [toggleList, setToggleList] = useState(true);
	const [toggleSideBar, setToggleSideBar] = useState(false);
	
	function listToggleHandler() {
		setToggleList(!toggleList);
	}

  const wrapping = classNames(
    'bg-gray-300 p-5',
    {
      ['w-10']: !toggleSideBar
    }
  )

  function toggleSideBarHandler(){
    setToggleSideBar(!toggleSideBar)
  }

	return (
		<>
      <div className='text-center text-6xl my-10 font-sans border-double border-4 bg-sky-300'>
        {recipe.title}
      </div>

      <div className="flex flex-row bg-gray-100 p-5">
        <div className="mr-5">
          <RecipeBanner images={recipe.images} prepTime={recipe.prep} cookTime={recipe.cook} servingAmount={recipe.servings}/>
        </div>

        <div className="w-screen mr-5">
          {toggleList && (
            <Ingredients ingredients={recipe.ingredients} />
          )}

          {!toggleList && (
            <Instructions instructions={recipe.instructions} />
          )}

          <div className="text-center m-5">        
            <ToggleButton value="ingredients" onClick={listToggleHandler}>
              {toggleList ? 'ingredients' : 'instructions'}
            </ToggleButton>
          </div>
        </div>

        <Button onClick={toggleSideBarHandler}>
            {toggleSideBar ? <KeyboardDoubleArrowRight/> : <KeyboardDoubleArrowLeft/>}
        </Button>    
        <div className={wrapping}>
          <SideBar nutrition={recipe.nutrition} state={toggleSideBar}/>
        </div>
      </div>

      <p className="text-xl m-10">
        {recipe.description}<a href="_blank">View More</a>
      </p>
		</>
	);
}

export default Details;
