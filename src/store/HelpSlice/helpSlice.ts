import { StateCreator } from 'zustand';

interface HelpSliceState {
  helpIsOpen: boolean;
  contentFilename?: string;
}

interface HelpSliceActions {
  /** set the Help content to open and the current help content ID*/
  showHelp: (nodeId: string) => void;
  /** hide the Help content */
  hideHelp: () => void;
}

export interface HelpSlice extends HelpSliceState, HelpSliceActions {}

export const createHelpSlice: StateCreator<
  HelpSlice,
  [['zustand/devtools', never]],
  [],
  HelpSlice
> = (set) => ({
  helpIsOpen: false,
  contentFilename: undefined,
  showHelp: (nodeId: string) => {
    set(
      {
        helpIsOpen: true,
        contentFilename: nodeId,
      },
      false,
      'showHelpDialog'
    );
  },
  hideHelp: () => {
    set(
      {
        helpIsOpen: false,
        contentFilename: undefined,
      },
      false,
      'hideHelpDialog'
    );
  },
});
