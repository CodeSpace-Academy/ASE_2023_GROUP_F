import classes from "./instructions.module.css";
import React from "react";

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
    </div>
  );
}

export default Instructions;
// import React from "react";

// const Instructions = ({ instructions }) => {
//   return (
//     <div>
//       <h2>Instructions</h2>
//       <ul>
//         {instructions.map((instruction, index) => (
//           <li key={index}>{instruction}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Instructions;
