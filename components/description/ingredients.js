import { Fragment } from "react";

function Ingredients(props){
  const { ingredients } = props;

  return(
    <Fragment>
      {ingredients.map((ingredient) => {
        <div>
          <h3>{ingredient}</h3>
          <div>
            <button>-</button>
              {ingredient.value}
            <button>+</button>
          </div>
        </div>
      })}
    </Fragment>
  );
}

export default Ingredients;