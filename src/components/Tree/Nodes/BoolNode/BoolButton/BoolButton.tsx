import React from 'react';

interface BoolButtonProps {
  onClick?: React.MouseEventHandler;
  id: string;
  response: boolean;
}

/**
 * icon to help users make decisions or direct them to more information
 * @constructor
 */
export const BoolButton = ({ onClick, id, response }: BoolButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        data-testid={`${id}-${response ? 'yes' : 'no'}-button`}
        className="mb-1 rounded-xl bg-slate-600 px-2 py-1 text-2xl font-semibold
            text-white transition-colors duration-200 ease-in-out hover:bg-slate-700
            focus:outline-none focus:ring-2 focus:ring-slate-50 active:bg-slate-800"
      >
        {response ? 'Yes' : 'No'}
      </button>
    </div>
  );
};
