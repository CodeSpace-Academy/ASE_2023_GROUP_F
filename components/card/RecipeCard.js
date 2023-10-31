import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "react-feather";
import TimeDisplay from "../time/TimeDisplay";
import TimeIcon from "../icons/TimeIcon";
import ServingIcon from "../icons/ServingIcon";
import Link from "next/link";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const RecipeCard = (props) => {
	const { title, images, recipe } = props;
	const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);

	const [currentImage, setCurrentImage] = useState(0);

	const changeImage = (direction) => {
		const newIndex = (currentImage + direction + images.length) % images.length;
		setCurrentImage(newIndex);
	};

	const toggleFavorite = async () => {
		try {
			if (isFavorite) {
				const confirmed = window.confirm(
					"Are you sure you want to remove this recipe from favorites?",
				);
				if (confirmed) {
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
						setIsFavorite(false);
					} else {
						console.error("Failed to update favorite status");
					}
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

	const isButtonVisible = images.length > 1;

	return (
		<div className=" bg-slate-200  rounded overflow-hidden shadow-md relative ">
			<div className="mx-8 mt-6 relative ">
				<img
					className="w-full h-32 sm:h-48 object"
					src={images[currentImage]}
					alt={`Recipe image ${currentImage + 1}`}

				/>
				
				<div className=" bg-secondary-100 text-red-500 text-xs uppercase font-bold rounded-full p-2 absolute top-0 right-0 ml-2 mt-2">
				<div className="flex justify-center items-center">
					<div
						style={{ cursor: 'pointer' }}
						onClick={toggleFavorite}
					>
						{isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
					</div>
				</div>
					
				</div>

				{isButtonVisible && (
					<div className="absolute inset-0 flex items-center justify-between p-4">
						<button
							className="p-1 rounded-full shadow bg-white 80 text-gray-800 hover:bg-white"
							onClick={() => changeImage(-1)}
						>
							<ChevronLeft size={20} />
						</button>
						<button
							className="p-1 rounded-full shadow bg-white 80 text-gray-800 hover:bg-white"
							onClickCapture={() => changeImage(1)}
						>
							<ChevronRight size={20} />
						</button>

					</div>
				)}


				<div className="absolute bottom-4 right-0 left-0">
					<div className="flex items-center justify-center gap-2"></div>
				</div>
			</div>

			<div className="inset-0 transform">
				<div className="px-6 py-4  rounded mx-8 hover:text-black hover:bg-gray-200">
					<div className="flex flex-col justify-between">
						<div className="font-semibold font-serif text-lg flex justify-center items-center">
							{title}
						</div>
						<div className="flex items-center gap-2 p-2">
							<span className="meaningful-class-name">
								<TimeIcon />
							</span>
							<TimeDisplay recipe={recipe} />
						</div>
						<div className="flex items-center gap-2 p-1">
							{recipe.servings && (
								<>
									<ServingIcon />
									<p>Serving: {recipe.servings}</p>
								</>
							)}
						</div>
					</div>
				</div>
			</div>



			<div className="flex justify-center items-center py-3">
				<button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
					<Link href={`/recipes/${recipe._id}`}>View Recipe</Link>
				</button>
			</div>
		</div>
	);
};

export default RecipeCard;
