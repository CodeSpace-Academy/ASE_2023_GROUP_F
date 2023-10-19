import Nutrition from "../nutrition/nutrition";

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