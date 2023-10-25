import { Co2Sharp } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

function FilterBySteps({recipesByInstructions, recipesInAscending, recipesInDescending}) {
  const [numberOfSteps, setNumberOfSTeps] = useState(1);

  function valueHandler(event) {
    if (event.target.value > 0) {
      setNumberOfSTeps(event.target.value);
    }
  }

  function loadingFilterHandler(){
    recipesByInstructions(numberOfSteps)
  }

  function handleAscending(){
    recipesInAscending()
  }

  function handleDescending(){
    recipesInDescending()
  }

  return (
    <>
      <Button onClick={handleAscending}>Ascending</Button>
      <Box>
        <TextField
          id="number-of-steps"
          label="Number of Steps"
          type="number"
          value={numberOfSteps}
          onChange={valueHandler}
        />
        <Button type="submit" onClick={loadingFilterHandler}>Filter</Button>
      </Box>
      <Button onClick={handleDescending}>Descending</Button>
    </>
  );
}

export default FilterBySteps;
