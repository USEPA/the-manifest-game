import useTreeStore from 'store';

export interface UseHelpReturn {
  helpIsOpen: boolean;
  helpContentId: string | undefined;
  showHelp: (contentId: string) => void;
  hideHelp: () => void;
}

/**
 * custom hook that exposes logic for interacting with the Help content
 */
export const useHelp = () => {
  const { helpIsOpen, helpContentId, hideHelp, showHelp } = useTreeStore((state) => state);

  return {
    helpIsOpen: helpIsOpen,
    helpContentId,
    showHelp,
    hideHelp,
  } as UseHelpReturn;
};
