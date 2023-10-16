import React from 'react';

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
    <div className="time-information">
      <p>Prep Time: {formattedPrepTime}</p>
      <p>Cooking Time: {formattedCookingTime}</p>
      <p>Total Time: {formatTime(totalCookingTime)}</p>
    </div>
  );
};

export default TimeDisplay;
