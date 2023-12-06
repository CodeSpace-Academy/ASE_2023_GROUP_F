import CookIcon from "../icons/CookIcon";
import PrepIcon from "../icons/PrepIcon";
import ServingIcon from "../icons/ServingIcon";
import TimeIcon from "../icons/TimeIcon";

/**
 * TimeDisplay component displays the preparation time, cooking time,
 * total time (prep + cook), and serving information for a recipe.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.recipe - The recipe object containing preparation (prep), cooking (cook), and servings information.
 * @param {number} minutes - The time in minutes to be formatted.
 * @returns {string} The formatted time string (e.g., "1 hr 30 mins").
 * @returns {JSX.Element|null} Returns the rendered TimeDisplay component or null if no recipe is provided.
 */

function TimeDisplay({ recipe }) {
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0 && remainingMinutes > 0) {
      return `${hours} hrs ${remainingMinutes} mins`;
    } if (hours > 0) {
      return `${hours} hrs`;
    } 
      return `${remainingMinutes} mins`;
    
  }

  // If no recipe is provided, render nothing
  if (!recipe) {
    return null;
  }

    // Format prep and cooking time
  const formattedPrepTime = formatTime(recipe.prep);
  const formattedCookingTime = formatTime(recipe.cook);

   // Calculate total cooking time
  const totalCookingTime = recipe.prep + recipe.cook;

  return (
    <div className="mb-10">
      <div className="flex gap-7 mb-4">
        <span className="flex">
          <PrepIcon fill="#cbd5e1" width="35" height="35" />
          <span className="ml-2 text-sm text-purple-950">
            <strong>Prep Time</strong> <br />
            {formattedPrepTime}
          </span>
        </span>
        <span className="flex items-center">
          <CookIcon fill="#cbd5e1" width="35" height="35" />
          <span className="ml-2 text-sm text-purple-950">
            <p>
              <strong>Cooking Time</strong> <br /> {formattedCookingTime}
            </p>
          </span>
        </span>
      </div>
      <span className="flex items-center">
        <TimeIcon />
        <span className="ml-2 mr-8 text-sm text-purple-950">
          <p>
            <strong>(Prep+cook)</strong> <br />
            {formatTime(totalCookingTime)}
          </p>
        </span>
        {recipe.servings && (
          <>
            <ServingIcon width="25" height="25" fill="#1e1b4b" />
            <p className="text-fuchsia-950">
              <strong>Serving:</strong> {recipe.servings}
            </p>
          </>
        )}
      </span>
    </div>
  );

}

export default TimeDisplay;
