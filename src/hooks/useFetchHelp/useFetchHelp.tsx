import { TextHelp } from 'components/Help/HelpContent/TextualHelp';
import { useEffect, useState } from 'react';

/** Configuration for an individual node, part of the larger config*/
export type HelpConfig = TextHelp;

/** Hook to fetch the help text for a given node from the server. */
export const useFetchHelp = (fileName?: string) => {
  const [help, setHelp] = useState<HelpConfig | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    setIsLoading(true);
    if (fileName) {
      fetch(`${import.meta.env.BASE_URL}help/${fileName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('There was a problem fetching this content.');
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
  }, [fileName]);

  return {
    help,
    isLoading,
    error,
  } as const;
};
