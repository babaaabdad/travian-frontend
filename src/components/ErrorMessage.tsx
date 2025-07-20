import React from 'react';

const ErrorMessage = ({ message, onClear }) => {
  if (!message) return null;

  return (
    <div className="bg-red-800 border border-red-600 text-white px-4 py-3 rounded-lg relative my-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
      {onClear && (
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClear}>
          <svg className="fill-current h-6 w-6 text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.03a1.2 1.2 0 1 1-1.697-1.697l3.03-2.651-3.03-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.03a1.2 1.2 0 1 1 1.697 1.697l-3.03 2.651 3.03 2.651a1.2 1.2 0 0 1 0 1.697z" />
          </svg>
        </span>
      )}
    </div>
  );
};

export default ErrorMessage;