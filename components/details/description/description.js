import Nutrition from "./nutrition/nutrition";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import classes from './description.module.css';

function Description({title, description, nutrition, prepTime}){
  return(
    <>    
      <div>
        <div className={classes.title}>
          <h1>{title ? title : "Recipe Not Found"}</h1>
          <h3><AccessTimeIcon/>{prepTime}min</h3>
        </div>
        <p>{description}<a href="_blank">View More</a></p>
      </div>
      <Nutrition nutritionList={nutrition}/>
    </>
  )
}

export default Description;