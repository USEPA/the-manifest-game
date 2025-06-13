import { useCallback, useEffect, useState } from 'react';
import { useTreeStore } from '@/store';

export interface UseHelpReturn {
  helpIsOpen: boolean;
  contentFilename: string | undefined;
  showHelp: (contentId: string | undefined) => void;
  hideHelp: () => void;
  showInstructions: () => void;
}

/**
 * custom hook that exposes logic for interacting with the Help content
 */
export const useHelp = () => {
  const {
    helpIsOpen,
    contentFilename,
    hideHelp,
    showHelp: storeShowHelp,
  } = useTreeStore((state) => state);
  const [firstTime, setFirstTime] = useState(window.localStorage.getItem('tmg-first-time'));

  const showHelp = useCallback(
    (contentId: string | undefined) => {
      if (!contentId) throw new Error('contentId is required');
      storeShowHelp(contentId);
    },
    [storeShowHelp]
  );

  const showInstructions = useCallback(() => {
    showHelp('guide.html');
  }, [showHelp]);

  useEffect(() => {
    if (!firstTime) {
      showInstructions();
    }
    setFirstTime('false');
    window.localStorage.setItem('tmg-first-time', 'false');
  }, [firstTime, showInstructions]);

  return {
    helpIsOpen: helpIsOpen,
    contentFilename,
    showHelp,
    hideHelp,
    showInstructions,
  } as UseHelpReturn;
};
