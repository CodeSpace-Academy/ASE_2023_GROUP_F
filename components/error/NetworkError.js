import React from 'react';

const NetworkError = (props) => {
  const { errorMessage } = props;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 my-4 rounded-md">
      {errorMessage}
    </div>
  );
};

export default NetworkError;
