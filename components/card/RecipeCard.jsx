import React, { useState } from 'react';
import Link from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'react-feather';
import TimeDisplay from '../time/TimeDisplay';

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
 * @param {Function} props.updateFavoriteRecipesCount - The function to update the recipe's favorites count
 *
 * @returns {JSX.Element} - A React functional component.
 */

function RecipeCard(props) {
  const { title, images, recipe, updateFavoriteRecipesCount } = props;
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
      confirm = window.confirm('Are you sure you want to remove this recipe from favorites?');
    }
    try {
      if (isFavorite && confirm) {
        const response = await fetch('/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
          console.error('Failed to update favorite status');
          setIsVisible(true);
          confirm = null;
        }
      } else {
        const response = await fetch('/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipeId: recipe._id,
            isFavorite: true,
          }),
        });

        if (response.ok) {
          setIsFavorite(true);
        } else {
          console.error('Failed to update favorite status');
        }
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  // Check if the image navigation buttons should be visible
  const isButtonVisible = images?.length > 1;

  return isVisible ? (
    <div className="max-w-sm transition duration-300 ease-in-out rounded-lg shadow-lg hover:bg-slate-700 bg-slate-600">
      <div className="relative rounded-lg">
        <div className="h-56 overflow-hidden ">
          <Image
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            src={images?.[currentImage]}
            alt={`Recipe image ${currentImage + 1}`}
            priority
          />
        </div>
        {isButtonVisible && (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              type="button"
              className="p-1 text-gray-800 bg-white rounded-full shadow hover:bg-white"
              onClick={() => changeImage(-1)}
              aria-label="Previous Image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              className="p-1 text-gray-800 bg-white rounded-full shadow hover:bg-white"
              onClickCapture={() => changeImage(1)}
              aria-label="Next Image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <div className="absolute top-0 right-0 p-2 mt-2 mr-2 text-xs font-bold text-red-500 uppercase rounded-full bg-secondary-100">
          <div className="flex items-center justify-center gap-2">
            <div style={{ cursor: 'pointer' }} onClick={toggleFavorite}>
              {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </div>
          </div>
        </div>
      </div>

      <Link href={`/recipes/${recipe._id}`}>
        <div className="inset-0 transform">
          <div className="px-6 hover:text-black">
            <div className="flex flex-col justify-between">
              <div className="pt-2 mb-4 font-serif font-bold lg:text-lg md:text-sm ">
                <strong className="block overflow-hidden font-extrabold md:text-lg lg:text-base xl:text-lg md:text-md sm:text-sm 2xl:text-sm text-slate-300">
                  {title}
                </strong>
              </div>
              <div>
                <TimeDisplay recipe={recipe} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ) : null;
}

export default RecipeCard;
