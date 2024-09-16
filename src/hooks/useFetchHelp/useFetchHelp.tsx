import { HelpContent } from '@/components/Help/Help';
import { useEffect, useState } from 'react';

/** Configuration for an individual node, part of the larger config*/
export type HelpConfig = HelpContent;

/** Hook to fetch the help text for a given node from the server. */
export const useFetchHelp = (fileName?: string) => {
  const [help, setHelp] = useState<HelpConfig | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | string>();

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
          const help: HelpContent = {
            type: 'text',

            content: data.content,
          };
          setHelp(help);
        } else {
          const help: HelpContent = {
            type: 'html',

            content: data,
          };
          setHelp(help);
        }
        setIsLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, [fileName]);

  return {
    help,
    isLoading,
    error,
  } as const;
};
