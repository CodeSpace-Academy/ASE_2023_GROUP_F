import React from "react";
import { ToggleButton, Card, Button } from "@mui/material";

function Ingredients(props) {
  const { ingredients } = props;
  let ingredient = Object.entries(ingredients);

  return (
    <div>
      <div className="">
        <h2 className="text-center font-bold">Ingredients</h2>
        {ingredient.map((item, index) => (
          <Card key={index} className="m-4 p-8">
            <div className="">
              {item[0]}: {item[1]}
            </div>
          </Card>
        ))}
        <div className="text-center">
          <Button value="add_to_cart" variant="outlined">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
