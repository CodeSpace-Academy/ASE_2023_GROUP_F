function Instructions(props){
  const { instructions } = props

  return(
    <>
      {instructions.map((instruction, index) => (
        <div>
          <h4>{index}</h4>
          <p>{instruction}</p>
        </div>
      ))}
    </>
  )
}

export default Instructions;
