/**
 * Button component represents a button used to trigger an action, such as loading more recipes.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * @param {number} props.remainingRecipes - The number of remaining recipes to be loaded or displayed.
 * 
 * @returns {JSX.Element} Returns the rendered Button component.
 */

function Button(props) {
  const { onClick, remainingRecipes } = props;
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        type="button"
        className="bg-slate-200 hover:bg-gray-600 hover:text-white border font-bold py-2 px-4 rounded-full shadow sm:w-32 md:w-40 lg:w-48 xl:w-56"
        onClick={onClick}
      >
        Show More Recipes ({remainingRecipes})
      </button>
    </div>
  );
}

export default Button;
