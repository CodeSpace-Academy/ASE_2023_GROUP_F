import React from 'react';
import { ToggleButton, Card, Button } from '@mui/material';

function Ingredients(props) {
  const { ingredients } = props;
  let ingredient = Object.entries(ingredients);

  return (
    <div>
      <div className="bg-red-400 h-96 overflow-y-auto">
        {ingredient.map((item, index) => (
          <Card key={index} className="m-8 p-8">
            <div className="">{item[0]}: {item[1]}</div>
          </Card>
        ))}
        <div className='text-center m-5'>
          <Button value="add_to_cart" variant="contained">Add to cart</Button>  
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
