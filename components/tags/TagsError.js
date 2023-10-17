function TagError(props) {

  const { message, onRetry} = props
    return (
      <div className="error">
        <p>{message}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }
  
  export default TagError;