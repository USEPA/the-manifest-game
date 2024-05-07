import useTreeStore from 'store';

export interface UseHelpReturn {
  helpIsOpen: boolean;
  contentFilename: string | undefined;
  showHelp: (contentId: string) => void;
  hideHelp: () => void;
}

/**
 * custom hook that exposes logic for interacting with the Help content
 */
export const useHelp = () => {
  const { helpIsOpen, contentFilename, hideHelp, showHelp } = useTreeStore((state) => state);

  return {
    helpIsOpen: helpIsOpen,
    contentFilename,
    showHelp,
    hideHelp,
  } as UseHelpReturn;
};
