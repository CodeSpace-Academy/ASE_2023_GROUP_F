import { Fragment } from "react";

function Instructions(props){
  const { instructions } = props

  return(
    <Fragment>
      {instructions.map((instruction, index) => {
        <div>
          <h4>{index}</h4>
          <p>{instruction}</p>
        </div>
      })}
    </Fragment>
  )
}

export default Instructions;