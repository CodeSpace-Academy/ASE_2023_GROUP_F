import React from "react";
import { Card, Button } from "@mui/material";

function Ingredients(props) {
  const { ingredients } = props;
  const ingredient = Object.entries(ingredients);

  return (
    <div>
      <div className="mx-10 rounded-xl">
        {ingredient.map((item, index) => (
          <Card key={index} className="p-2 bg-gray-200 text-lg">
            {item[0]}: {item[1]}
          </Card>
        ))}
        <div className="text-center">
          <br />
          <br />
          <br />
          <Button value="add_to_cart" variant="outlined">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
