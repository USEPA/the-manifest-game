import React from 'react';

export interface TextHelp {
  type: 'text';
  content: string;
}

interface HelpContentProps {
  help?: TextHelp;
}

/**
 * Renders the textual help content
 * @constructor
 */
export const TextualHelp = ({ help }: HelpContentProps) => {
  return (
    <div
      data-testid={'help-content'}
      style={{
        whiteSpace: 'pre-line',
        fontSize: '1.2rem',
        maxHeight: '100%',
      }}
    >
      {help ? <p>{help.content}</p> : <p> Help is unavailable for this node.</p>}
    </div>
  );
};
