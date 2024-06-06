import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface BoolButtonProps {
  onClick?: React.MouseEventHandler;
  id: string;
  response: boolean;
  selected?: boolean;
}

/**
 * icon to help users make decisions or direct them to more information
 * @constructor
 */
export const BoolButton = ({ onClick, id, response, selected }: BoolButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        aria-label={
          selected ? 'selected response ' + (response ? 'Yes' : 'No') : response ? 'Yes' : 'No'
        }
        data-testid={`${id}-${response ? 'yes' : 'no'}-button`}
        className={`mb-1 rounded-xl px-2 py-1 text-2xl font-semibold text-white transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-50 active:bg-slate-800 ${selected ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-600 hover:bg-slate-700'}`}
      >
        <div className="flex min-w-20 items-center">
          {response ? 'Yes' : 'No'}
          {selected ? <FaCheck className="ms-2" /> : ''}
        </div>
      </button>
    </div>
  );
};
