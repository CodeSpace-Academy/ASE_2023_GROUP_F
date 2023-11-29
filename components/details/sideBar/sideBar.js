import Nutrition from "../nutrition/nutrition";

/**
 * SideBar Component
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.nutrition - Nutrition information to be displayed in the sidebar.
 * @param {boolean} props.state - A boolean value indicating whether the sidebar is in an active state.
 * 
 * @returns {JSX.Element} SideBar component
 */

function SideBar({nutrition, state}){

  return(
      <div>
        {state && <Nutrition nutritionList={nutrition}/>}
        {state &&           
          <div className="text-xl text-center mt-3 font-bold text-sky-500 border-double border-4 border-sky-500">
            Nutrition
          </div>}
      </div>
  )
}

export default SideBar;