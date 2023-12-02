import React from 'react';
import { Slash } from 'react-feather';

/**
 * HandleError Component
 * 
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - The content to be displayed within the error message.
 * 
 * @returns {JSX.Element} HandleError component
 */

function HandleError(props) {
  const { children } = props;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-red-200 border border-red-500 text-red-700 px-6 py-4 rounded-md shadow-md flex items-center max-w-md">
        <Slash className="w-10 h-10 text-red-500 mr-4" />
        <div>
          <p className="font-bold text-xl mb-2">Oh no! The Recipe Cauldron got a little messy!</p>
          <p className="text-lg">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default HandleError;
