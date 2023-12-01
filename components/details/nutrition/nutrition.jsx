import { Card } from '@mui/material';

/**
 * Nutrition Component
 *
 * @param {Object} props - Component properties
 * @param {Object} props.nutritionList - An object representing the nutrition information.
 *
 * @returns {JSX.Element} Nutrition component
 */

function Nutrition({ nutritionList }) {
  // Convert the object into an array of key-value pairs
  const nutrition = Object.entries(nutritionList);

  return (
    <div className=" overflow-y-auto flex flex-row rounded-xl">
      {nutrition.map(([key, value]) => (
        <Card sx={{ margin: 0.5, padding: 1 }}>
          <div>
            {key}: {value}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Nutrition;
