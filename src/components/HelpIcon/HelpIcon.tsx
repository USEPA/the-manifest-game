import React from 'react';

interface HelpIconProps {
  onClick?: React.MouseEventHandler;
}

/**
 * icon to help users make decisions or direct them to more information
 * @constructor
 */
export const HelpIcon = ({ onClick }: HelpIconProps) => {
  return (
    <div>
      <button aria-label="help" onClick={onClick}>
        Help
      </button>
    </div>
  );
};
