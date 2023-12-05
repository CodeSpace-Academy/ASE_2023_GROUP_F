import { Card } from '@mui/material'

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
  const nutrition = Object.entries(nutritionList)

  return (
    <div className="overflow-y-auto flex  rounded-xl p-2 ">
    {nutrition.map(([key, value]) => (
      <div className="w-full sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6 mb-2 px-2 " key={key}>
        <div className="bg-gray-200 rounded-xl p-2 shadow-md">
          <div className="text-gray-800 text-sm sm:text-base md:text-sm lg:text-sm xl:text-sm">
            <span className="font-semibold">{key}:</span> {value}
          </div>
        </div>
      </div>
    ))}
  </div>
  
  
  
  )
}

export default Nutrition
