import { BoolNodeConfig, DefaultNodeConfig } from 'services/config/config';

export const jsonDummyTree: Array<BoolNodeConfig | DefaultNodeConfig> = [
  {
    id: '0',
    type: 'BoolNode',
    data: {
      label: 'Do you like cats?',
      yesId: '1',
      noId: '2',
    },
  },
  {
    id: '1',
    type: 'default',
    data: {
      label: 'You like cats',
      children: [],
    },
  },
  {
    id: '2',
    type: 'default',
    data: {
      label: "You don't like cats",
      children: [],
    },
  },
];
