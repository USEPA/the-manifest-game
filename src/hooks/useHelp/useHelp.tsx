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
  const { isOpen, helpContentId, hideHelp, showHelp } = useTreeStore((state) => state);

  return {
    helpIsOpen: isOpen,
    helpContentId,
    showHelp,
    hideHelp,
  } as UseHelpReturn;
};
