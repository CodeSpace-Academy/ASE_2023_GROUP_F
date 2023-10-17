import React, { useState } from "react";
import DateIcon from "../icons/DateIcon";
import TimeDisplay from "../time/TimeDisplay";
import TimeIcon from "../icons/TimeIcon";
import ServingIcon from "../icons/ServingIcon";

const RecipeCard = (props) => {
	const { title, images, published , recipe} = props;
	const [currentImage, setCurrentImage] = useState(0);

	const humanReadable = new Date(published).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const changeImage = (direction) => {
		const newIndex = (currentImage + direction + images.length) % images.length;
		setCurrentImage(newIndex);
	};

	return (
		<div className="max-w-xm rounded overflow-hidden shadow-lg mx-auto my-4 relative transition-transform duration-300 transform hover:scale-105">
			<div className="h-80 relative">
				<img
					className="w-full h-full object-cover"
					src={images[currentImage]}
					alt={`Recipe image ${currentImage + 1}`}
				/>
				<button
					className="absolute top-1/2 transform -translate-y-1/2 left-4 text-6xl text-blue hover:text-indigo-500 transition duration-300 ease-in-out"
					onClick={() => changeImage(-1)}
				>
					&lt;
				</button>
				<button
					className="absolute top-1/2 transform -translate-y-1/2 right-4 text-6xl text-blue hover:text-indigo-500 transition duration-300 ease-in-out"
					onClick={() => changeImage(1)}
				>
					&gt;
				</button>
			</div>

			<div className="px-6 py-11 bg-gray-200 rounded">
				<div className="flex flex-col h-40 justify-between">
					<div className="font-bold text-xl">{title}</div>
					<div className="flex items-center gap-2 p-2">
					<span className="span"><TimeIcon /></span>
					<TimeDisplay recipe={recipe}/>
					</div>
					<div className="flex items-center gap-2 p-1">
						{recipe.servings ? (<> <ServingIcon /><p>Serving:{recipe.servings}</p></>) : ''}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
