import { useState } from 'react';
import { PositionUnawareDecisionTree } from 'store';

/** Configuration for an individual node, part of the larger config*/
export interface HelpConfig {
  type: string;
  content: string;
}

/** Hook to fetch the help text for a given node from the server. */
export const useFetchHelp = (nodeId: string) => {
  const [help, setHelp] = useState<PositionUnawareDecisionTree>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();

  return {
    help,
    isLoading,
    error,
  } as const;
};
