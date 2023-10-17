import classes from "./instructions.module.css";
import React from "react";
import Link from "next/link";

import { ToggleButton } from "@mui/material";

function Instructions(props) {
  const { instructions } = props;

  return (
    <div>
      {instructions.map((item, index) => (
        <div key={index} className={classes.card}>
          <div className={classes.step_number}>{index + 1} </div>
          <div className={classes.instruction}>{item}</div>
        </div>
      ))}
      <ToggleButton value="start_cooking">
        <Link href='/recipes/cookingMode'>
          Start Cooking 
        </Link>
      </ToggleButton>
    </div>
  );
}

export default Instructions;
