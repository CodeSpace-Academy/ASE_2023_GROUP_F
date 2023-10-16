import classes from "./instructions.module.css";
import React from "react";

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
      <ToggleButton value="start_cooking">Start Cooking</ToggleButton>
    </div>
  );
}

export default Instructions;
