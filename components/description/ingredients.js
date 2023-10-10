function Ingredients(props){
  const { ingredients } = props;

  return(
    <>
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
    </>
  );
}

export default Ingredients;
