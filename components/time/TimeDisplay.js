/**
 * TimeDisplay component displays the preparation time, cooking time,
 * total time (prep + cook), and serving information for a recipe.
 *
 * @component
 * @param {number} minutes - The time in minutes to be formatted.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.recipe - The recipe object containing preparation (prep),
 * cooking (cook), and servings information.
 * 
 * @returns {JSX.Element|null} Returns the rendered TimeDisplay component or null if no recipe is provided.
 */

import CookIcon from "../icons/CookIcon";
import PrepIcon from "../icons/PrepIcon";
import ServingIcon from "../icons/ServingIcon";
import TimeIcon from "../icons/TimeIcon";
const TimeDisplay = ({ recipe }) => {
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0 && remainingMinutes > 0) {
      return `${hours} hrs ${remainingMinutes} mins`;
    } else if (hours > 0) {
      return `${hours} hrs`;
    } else {
      return `${remainingMinutes} mins`;
    }
  }

  if (!recipe) {
    return null;
  }

  const formattedPrepTime = formatTime(recipe.prep);
  const formattedCookingTime = formatTime(recipe.cook);
  const totalCookingTime = recipe.prep + recipe.cook;

  return (
    <div>
      <div className="flex gap-7 mb-4">
        <span className="flex">
          <PrepIcon fill="#000000" width="35" height="35" />
          <span className="ml-2 text-sm">
            <strong>Prep Time</strong> <br />
            {formattedPrepTime}
          </span>
        </span>
        <span className="flex items-center">
          <CookIcon fill="#000000" width="35" height="35" />
          <span className="ml-2 text-sm">
            <p>
              <strong>Cooking Time</strong> <br /> {formattedCookingTime}
            </p>
          </span>
        </span>
      </div>
      <span className="flex items-center">
        <TimeIcon />
        <span className="ml-2 mr-8 text-sm">
          <p>
            <strong>(Prep+cook)</strong> <br />
            {formatTime(totalCookingTime)}
          </p>
        </span>
        {recipe.servings && (
          <>
            <ServingIcon width="25" height="25" fill="#2B5B95" />
            <p>
              <strong>Serving:</strong> {recipe.servings}
            </p>
          </>
        )}
      </span>
    </div>
  );
  
};

export default TimeDisplay;
