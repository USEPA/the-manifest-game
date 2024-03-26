import { useEffect, useState } from 'react';

/** Configuration for an individual node, part of the larger config*/
export interface HelpConfig {
  type: string;
  content: string;
}

/** Hook to fetch the help text for a given node from the server. */
export const useFetchHelp = (nodeId?: string) => {
  const [help, setHelp] = useState<HelpConfig | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    setIsLoading(true);
    if (nodeId) {
      fetch(`/help/${nodeId}.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('There was a problem fetching help.');
          }
          return response.json();
        })
        .then((data) => {
          setHelp(data);
          setIsLoading(false);
        })
        .catch((e) => {
          setError(e);
          setIsLoading(false);
        });
    }
  }, [nodeId]);

  return {
    help,
    isLoading,
    error,
  } as const;
};
