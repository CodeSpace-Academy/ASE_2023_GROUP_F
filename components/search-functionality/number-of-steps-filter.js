import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

function FilterBySteps({filterFunc}) {
  const [numberOfSteps, setNumberOfSTeps] = useState(1);

  function valueHandler(event) {
    if (event.target.value > 0) {
      setNumberOfSTeps(event.target.value);
    }
  }

  function loadingFilterHandler(){
    filterFunc(parseInt(numberOfSteps))
  }

  return (
    <>
      <Button>Ascending</Button>
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
      <Button>Descending</Button>
    </>
  );
}

export default FilterBySteps;
