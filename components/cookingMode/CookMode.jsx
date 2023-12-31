import React, { useState, useEffect } from "react";
import classes from "./cookMode.module.css";
import Modal from "./Modal";

/**
 * CookingMode Component
 *
 * A React component that represents a cooking mode interface, allowing users to
 * interact with and track the progress of cooking a recipe. It includes sections
 * for selecting ingredients, viewing instructions, and progressing through each step.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.ingredients - An object representing the ingredients of the recipe.
 * @param {Array} props.instructions - An array of strings representing the steps of the recipe.
 *
 * @returns {JSX.Element} - The JSX representation of the CookingMode component.
 */

function CookingMode(props) {
  const { ingredients, instructions } = props;

  // State varibles 
  
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [showIngredients, setShowIngredients] = useState(true); // New state for controlling ingredient visibility

  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false); // State to track completion

  // Function to handle checkbox change for ingredients
  const handleCheckboxChange = (ingredientName) => {
    setCheckedIngredients((prevState) => ({
      ...prevState,
      [ingredientName]: !prevState[ingredientName],
    }));
  };

  // Function to handle "Select All" button
  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedIngredients({});
    } else {
      const allIngredients = {};
      Object.keys(ingredients).forEach((ingredientName) => {
        allIngredients[ingredientName] = true;
      });
      setCheckedIngredients(allIngredients);
    }
    setSelectAll(!selectAll);
  };

  // Effect to update selectedInstruction when currentStep changes
  const showInstructionsComponent = () => {
    setShowInstructions(true);
  };
  // Function to close the instructions modal
  const closeInstructions = () => {
    setShowInstructions(false);
    setShowIngredients(false); // Hide ingredients after closing the modal
  };

  const selectInstruction = (index) => {
    setSelectedInstruction(index);
    setCurrentStep(index); // Update currentStep with the selected instruction index
  };

  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < instructions.length) {
      setCurrentStep(nextStep);
      setSelectedInstruction(nextStep); // Update selectedInstruction with the new currentStep
    } else {
      setIsCompleted(true);
    }
  };

  // Effect to update selectedInstruction when currentStep changes
  useEffect(() => {
    setSelectedInstruction(currentStep);
  }, [currentStep]);

  return (
    <div>
      {showInstructions ? (
        <Modal onClose={closeInstructions}>
          <h3>Step</h3>
          <div>
            {instructions.map((item, index) => (
              <div
                key={item}
                className={classes.instructionCard}
                onClick={() => selectInstruction(index)}
              >
                <div className={classes.step_number}>{index + 1}</div>
                <div className={classes.instruction}>{item}</div>
              </div>
            ))}
          </div>
          <button type="button" className={classes.button} onClick={closeInstructions}>
            Return to current step
          </button>
        </Modal>
      ) : showIngredients ? (
        <div>
          <div className={classes.select}>
            <h2>Select Ingredients</h2>
            <label
              htmlFor="selectAll"
              onClick={handleSelectAll}
              className={classes.selectAll}
            >
              Select All
            </label>
          </div>

          <div>
            {Object.entries(ingredients).map((item) => (
              <div className={classes.ingredient}>
                <input
                  type="checkbox"
                  id={`ingredient-${item[0]}`}
                  checked={checkedIngredients[item[0]] || false}
                  onChange={() => handleCheckboxChange(item[0])}
                />
                <div key={item} className={classes.ingredientCard}>
                  <div>{item[0]}</div>
                </div>
              </div>
            ))}
          </div>
          <button
          type="button"
            onClick={showInstructionsComponent}
            className={classes.button}
          >
            Continue
          </button>
        </div>
      ) : (
        selectedInstruction !== null && (
          <div className={classes.container}>
            <div>
              {isCompleted ? (
                <>
                  <img
                    src="../images/undraw_breakfast_psiw.svg"
                    alt="Delicious Food"
                    className={classes.Image}
                  />
                  <h1>Time to Eat!</h1>
                  <h4>You did it. Enjoy your meal!</h4>
                </>
              ) : (
                <>
                  <label
                    htmlFor="allSteps"
                    onClick={showInstructionsComponent}
                    className={classes.selectAll}
                  >
                    Show All Steps
                  </label>

                  <div className={classes.instructionText}>
                    {instructions[selectedInstruction]}
                  </div>
                  <img
                    src="../images/undraw_season_change_f99v.svg"
                    alt="timerImage"
                    className={classes.Image}
                  />
                  <div className={classes.step_number}>
                    <div> Step</div>
                    <div>
                      {selectedInstruction + 1} of {instructions.length}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className={classes.progressBar}>
              <div
                className={classes.progressBarFill}
                style={{
                  width: `${(currentStep / (instructions.length - 1)) * 100}%`,
                }}
              />
            </div>
            {currentStep < instructions.length ? (
              <button type="button" onClick={goToNextStep} className={classes.button}>
                {isCompleted ? "Completed" : "Next Step"}
              </button>
            ) : null}
          </div>
        )
      )}
    </div>
  );
}

export default CookingMode;
