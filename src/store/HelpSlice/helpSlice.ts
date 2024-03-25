import { StateCreator } from 'zustand';

interface HelpSliceState {
  helpOpen: boolean;
}

interface HelpSliceActions {
  /** set the Help content to open and the current help content ID*/
  openHelp: (nodeId: string) => void;
}

export interface HelpSlice extends HelpSliceState, HelpSliceActions {}

export const createHelpSlice: StateCreator<
  HelpSlice,
  [['zustand/devtools', never]],
  [],
  HelpSlice
> = (set) => ({
  helpOpen: false,
  openHelp: (nodeId: string) => {
    console.log('openHelp', nodeId);
    set(
      {
        helpOpen: true,
      },
      false,
      'openHelpDialog'
    );
  },
});
