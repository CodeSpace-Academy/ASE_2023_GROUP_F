import React from "react";
import Link from "next/link";

import { ToggleButton, Card, Button } from "@mui/material";

function Instructions(props) {
  const { instructions } = props;

  return (
    <div>
      <div className="bg-green-500 p-8">
        {instructions.map((item, index) => (
          <Card key={index} className="m-8 p-8">
            <div className=''>{index + 1}: {item} </div>
          </Card>
        ))}
        <div className='text-center'>
          <Button value="start_cooking" variant="contained">
            <Link href=''>
              Inspect Instructions 
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
