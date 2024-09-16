import { Button } from '@/components/ui/Button';
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
      <Button
        variant="boolean"
        onClick={onClick}
        aria-label={
          selected ? 'selected response ' + (response ? 'Yes' : 'No') : response ? 'Yes' : 'No'
        }
        data-testid={`${id}-${response ? 'yes' : 'no'}-button`}
        selected={selected}
      >
        <div className="flex min-w-20 items-center">
          <FaCheck className={selected ? 'mx-2' : 'invisible mx-2 aria-hidden:hidden'} />
          <span>{response ? 'Yes' : 'No'}</span>
        </div>
      </Button>
    </div>
  );
};
