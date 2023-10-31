import CookIcon from "../icons/CookIcon";
import PrepIcon from "../icons/PrepIcon";
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
    <div className="time-information ">
      <span className="flex items-center">
        <PrepIcon fill="#000000" width="40" height="50" />
        <span className="ml-2"> <strong>Prep Time</strong> <br/>{formattedPrepTime}</span>
      </span>
      <span className="flex items-center">
        <CookIcon fill="#000000" width="35" height="35" />
        <span className="ml-2">
          <p><strong>Cooking Time</strong> <br/> {formattedCookingTime}</p>
        </span>
      </span>
      <span className="flex items-center">
        <TimeIcon  />
        <span className="ml-2">
          <p><strong>Time(Prep+cook)</strong> <br/>{formatTime(totalCookingTime)}</p>
        </span>
      </span>
    </div>
  );
};

export default TimeDisplay;
