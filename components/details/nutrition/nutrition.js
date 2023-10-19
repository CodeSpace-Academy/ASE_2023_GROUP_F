import { Card } from "@mui/material";

function Nutrition({nutritionList}){
  const nutrition = Object.entries(nutritionList)

  return(
    <div className="h-96 overflow-y-auto bg-cyan-500">
      {nutrition.map(([key, value]) => (
        <Card sx={{margin: 3, padding: 3, width: 150}}>
          <div>
            {key}: {value}
          </div>
        </Card>
      ))}
    </div>
  )
}

export default Nutrition;