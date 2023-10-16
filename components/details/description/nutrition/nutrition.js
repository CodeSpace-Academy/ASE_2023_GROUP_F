import { Card, Typography } from "@mui/material";
import classes from './nutrition.module.css'

function Nutrition({nutritionList}){
  const nutrition = Object.entries(nutritionList)

  return(
    <ul className={classes.list}>
      {nutrition.map(([key, value]) => (
        <Card sx={{margin: 3, padding: 3, width: 125}}>
          <li>{key}: {value}</li>
        </Card>
      ))}
    </ul>
  )
}

export default Nutrition;