import React from 'react';

type HelpContent = TextHelp;

export interface TextHelp {
  type: 'text';
  data: string;
}

interface HelpContentProps {
  help?: HelpContent;
}

/**
 * Renders the help content
 * @constructor
 */
export const HelpContent = ({ help }: HelpContentProps) => {
  if (!help) {
    return (
      <div data-testid={'help-content'}>
        <p>Help is unavailable for this node.</p>
      </div>
    );
  }
  if (help.type === 'text') {
    return <div data-testid={'help-content'}>{help.data}</div>;
  }
};
