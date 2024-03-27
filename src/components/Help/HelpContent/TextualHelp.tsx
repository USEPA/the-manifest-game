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
    <div data-testid={'help-content'} className="max-h-full whitespace-pre-line text-lg">
      <p className="text-black">{help ? help.content : 'Help is unavailable for this node.'}</p>
    </div>
  );
};
