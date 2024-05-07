import { HelpContent } from 'components/Help/Help';
import { useEffect, useState } from 'react';

/** Configuration for an individual node, part of the larger config*/
export type HelpConfig = HelpContent;

/** Hook to fetch the help text for a given node from the server. */
export const useFetchHelp = (fileName?: string) => {
  const [help, setHelp] = useState<HelpConfig | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    setIsLoading(true);
    if (!fileName) {
      return;
    }
    if (!fileName.endsWith('.json') && !fileName.endsWith('.html')) {
      setError('Invalid file type');
    }
    fetch(`${import.meta.env.BASE_URL}help/${fileName}`)
      .then((response) => {
        if (!response.ok) {
          setError('Failed to fetch content');
        }
        return response;
      })
      .then((response) => {
        if (fileName.endsWith('.json')) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (fileName.endsWith('.json')) {
          data = {
            type: 'text',
            content: data.content,
          };
        } else {
          data = {
            type: 'html',
            content: data,
          };
        }
        setHelp(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e);
        setIsLoading(false);
      });
  }, [fileName]);

  return {
    help,
    isLoading,
    error,
  } as const;
};
