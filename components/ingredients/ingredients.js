import classes from "./ingredients.module.css";

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
    </div>
  );
}

export default Ingredients;
