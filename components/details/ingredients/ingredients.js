import classes from "./ingredients.module.css";
import { ToggleButton } from "@mui/material";

function Ingredients(props) {
  const { ingredients } = props;
  let ingredient = Object.entries(ingredients);

  return (
    <div>
      {ingredient.map((item, index) => (
        <div key={index} className={classes.card}>
          <div className={classes.ingredient}>{item[0]} </div>
          <div className={classes.measurment}>{item[1]}</div>
        </div>
      ))}
      <ToggleButton value="add_to_cart">Add to cart</ToggleButton>
    </div>
  );
}

export default Ingredients;
