import React from 'react';

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
    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 text-red-500 mr-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
        <div className="text-center">
          <p className="font-bold">Oops! Something went wrong.</p>
          <p className="text-xl">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default HandleError;