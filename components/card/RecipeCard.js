/**
 * RecipeCard Component
 * 
 * This component represents a card displaying information about a recipe. It includes
 * the recipe title, images, and additional details such as time display. Users can
 * toggle the recipe as a favorite and navigate through multiple images if available.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the recipe.
 * @param {Array} props.images - An array of URLs representing the images of the recipe.
 * @param {Object} props.recipe - The recipe object containing details.
 * @param {string} props.recipe._id - The unique identifier of the recipe.
 * @param {boolean} props.recipe.isFavorite - The favorite status of the recipe.
 * 
 * @returns {JSX.Element} - A React functional component.
 */

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import TimeDisplay from "../time/TimeDisplay";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";

const RecipeCard = (props) => {
  const { title, images, recipe , updateFavoriteRecipesCount } = props;
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);
  const [isVisible, setIsVisible] = useState(true);

  // State for current displayed image
  const [currentImage, setCurrentImage] = useState(0);

  // Function to change displayed image
  const changeImage = (direction) => {
    const newIndex = (currentImage + direction + images.length) % images.length;
    setCurrentImage(newIndex);
  };

  const toggleFavorite = async () => {
    let confirm;

    if (isFavorite) {
      confirm = window.confirm(
        "Are you sure you want to remove this recipe from favorites?"
      );
    }
    try {
      if (isFavorite && confirm) {
        const response = await fetch("/api/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipeId: recipe._id,
            isFavorite: false,
          }),
        });

        if (response.ok) {
          if (confirm) {
            setIsFavorite(false);
            setIsVisible(false);
            updateFavoriteRecipesCount({ isVisible: false });
          }
        } else {
          console.error("Failed to update favorite status");
          setIsVisible(true);
          confirm = null;
        }
      } else {
        const response = await fetch("/api/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipeId: recipe._id,
            isFavorite: true,
          }),
        });

        if (response.ok) {
          setIsFavorite(true);
        } else {
          console.error("Failed to update favorite status");
        }
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  // Check if the image navigation buttons should be visible
  const isButtonVisible = images?.length > 1;

  return isVisible ? (
    <div className="bg-slate-200 rounded-lg shadow-lg max-w-sm transition duration-300 ease-in-out hover:scale-105">
      <div className="relative rounded-lg">
        <div className=" h-56 overflow-hidden">
          <Image
            className="rounded-lg"
            width={400}
            height={224}
            src={images?.[currentImage]}
            alt={`Recipe image ${currentImage + 1}`}
          />
        </div>
        {isButtonVisible && (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              className="p-1 rounded-full shadow bg-white text-gray-800 hover:bg-white"
              onClick={() => changeImage(-1)}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="p-1 rounded-full shadow bg-white text-gray-800 hover:bg-white"
              onClickCapture={() => changeImage(1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <div className="bg-secondary-100 text-red-500 text-xs uppercase font-bold rounded-full p-2 absolute top-0 right-0  mr-2 mt-2">
          <div className="flex items-center justify-center gap-2">
            <div style={{ cursor: "pointer" }} onClick={toggleFavorite}>
              {isFavorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="inset-0 transform">
        <div className="px-6 hover:text-black hover:bg-slate-300">
          <div className="flex flex-col justify-between">
            <div className="font-bold font-serif text-lg pt-2 mb-4 ">
              <strong>{title}</strong>
            </div>
            <div>
              <TimeDisplay recipe={recipe} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-3">
        <button className="hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 text-center mr-2 mt-2 dark:border-gray-600 dark:text-blue-950 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
          <Link href={`/recipes/${recipe._id}`}>View Recipe</Link>
        </button>
      </div>
    </div>
  ) : null;
};

export default RecipeCard;
