import Ingredients from "./ingredients/ingredients";
import Instructions from "./instructions/instructions";
import Description from "../description/description";
import { useState } from "react";
import { Button, ToggleButton } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import classNames from "classnames";
import RecipeTags from "../tags/RecipeTags";

import RecipeBanner from "./recipeBanner/recipeBanner";
import SideBar from "./sideBar/sideBar";

function Details(props) {
  const { recipe } = props;

  const [toggleList, setToggleList] = useState(true);
  const [toggleSideBar, setToggleSideBar] = useState(false);

  function toggleIngredients() {
    setToggleList(true);
  }

  function toggleInstructions() {
    setToggleList(false);
  }

  const wrapping = classNames("bg-gray-300 p-5 right-0 relative", {
    ["w-10"]: !toggleSideBar,
  });

  function toggleSideBarHandler() {
    setToggleSideBar(!toggleSideBar);
  }

  return (
    <>
      <div className="flex flex-row bg-gray-100 p-5 justify-between">
        <div className="mr-5">
          <RecipeBanner
            images={recipe.images}
            prepTime={recipe.prep}
            cookTime={recipe.cook}
            servingAmount={recipe.servings}
          />
        </div>
        <div className="text-center text-6xl my-10 font-sans border-double border-4 bg-gray-200 max-w-xl">
          {recipe.title}

          <p className="text-xl m-10">
            <Description
              recipeId={recipe._id}
              description={recipe.description}
            />
            <a href="_blank">View More</a>
          </p>
        </div>

        <div className="flex flex-row">
          <Button onClick={toggleSideBarHandler}>
            {toggleSideBar ? (
              <KeyboardDoubleArrowRight />
            ) : (
              <KeyboardDoubleArrowLeft />
            )}
          </Button>
          <div className={wrapping}>
            <SideBar nutrition={recipe.nutrition} state={toggleSideBar} />
          </div>
        </div>
      </div>
      <div>
        <RecipeTags tags={recipe.tags} />
      </div>

      <div className="w-screen mr-5">
        <div className="text-center m-5">
          <Button
            value="ingredients"
            variant={toggleList ? "contained" : "text"}
            onClick={toggleIngredients}
          >
            ingredients
          </Button>
          <Button
            value="ingredients"
            variant={!toggleList ? "contained" : "text"}
            onClick={toggleInstructions}
          >
            instructions
          </Button>
        </div>

        {toggleList && <Ingredients ingredients={recipe.ingredients} />}

        {!toggleList && <Instructions instructions={recipe.instructions} />}
      </div>
    </>
  );
}

export default Details;
