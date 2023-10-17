import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'react-feather'; 
import TimeDisplay from "../time/TimeDisplay";
import TimeIcon from "../icons/TimeIcon";
import ServingIcon from "../icons/ServingIcon";


const RecipeCard = (props) => {
	const { title, images, recipe } = props; 

	const [currentImage, setCurrentImage] = useState(0);

	

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
				<div className="absolute inset-0 flex items-center justify-between p-4">
					<button  className="p-1 rounded-full shadow bg-white 80 text-gray-800 hover:bg-white" 
					onClick={() => changeImage(-1)}>
						<ChevronLeft size={20} />
					</button>
					<button className="p-1 rounded-full shadow bg-white 80 text-gray-800 hover:bg-white"
					onClickCapture={()=> changeImage(1)}>
					<ChevronRight size={20} />
					</button>
				</div>
				<div className="absolute bottom-4 right-0 left-0">
					<div className ="flex items-center justify-center gap-2">
					
						
					</div>
				</div>

			</div>

			<div className="px-6 py-11 bg-gray-200 rounded">
				<div className="flex flex-col h-40 justify-between">
					<div className="font-bold text-xl">{title}</div>
					<div className="flex items-center gap-2 p-2">
						<span className="meaningful-class-name"><TimeIcon /></span>
						<TimeDisplay recipe={recipe} />
					</div>
					<div className="flex items-center gap-2 p-1">
						{recipe.servings && <><ServingIcon /><p>Serving: {recipe.servings}</p></>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
