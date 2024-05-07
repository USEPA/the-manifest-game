import useTreeStore from 'store';

export interface UseHelpReturn {
  helpIsOpen: boolean;
  contentFilename: string | undefined;
  showHelp: (contentId: string | undefined) => void;
  hideHelp: () => void;
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

  const showHelp = (contentId: string | undefined) => {
    if (!contentId) return;
    storeShowHelp(contentId);
  };

  return {
    helpIsOpen: helpIsOpen,
    contentFilename,
    showHelp,
    hideHelp,
  } as UseHelpReturn;
};
