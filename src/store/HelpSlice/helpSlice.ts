import { StateCreator } from 'zustand';

interface HelpSliceState {
  isOpen: boolean;
  helpContentId?: string;
}

interface HelpSliceActions {
  /** set the Help content to open and the current help content ID*/
  showHelp: (nodeId: string) => void;
}

export interface HelpSlice extends HelpSliceState, HelpSliceActions {}

export const createHelpSlice: StateCreator<
  HelpSlice,
  [['zustand/devtools', never]],
  [],
  HelpSlice
> = (set) => ({
  isOpen: false,
  helpContentId: undefined,
  showHelp: (nodeId: string) => {
    set(
      {
        isOpen: true,
        helpContentId: nodeId,
      },
      false,
      'showHelpDialog'
    );
  },
});
