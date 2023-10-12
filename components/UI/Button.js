const Button = (props) => {
	const { onClick, remainingRecipes } = props;
	return (
		<div className="flex justify-center items-center mt-4">
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:w-32 md:w-40 lg:w-48 xl:w-56"
				onClick={onClick}
			>
				Show More Recipes ({remainingRecipes})
			</button>
		</div>
	);
};

export default Button;
