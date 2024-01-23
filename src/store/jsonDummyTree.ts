export interface DefaultNodeConfig {
  id: string;
  type?: 'default';
  children: string[];
  data: { label: string };
}

export interface BoolNodeConfig {
  id: string;
  type?: 'BoolNode';
  data: { question: string };
  yesId: string;
  noId: string;
}

export const jsonDummyTree: Array<BoolNodeConfig | DefaultNodeConfig> = [
  {
    id: '0',
    type: 'BoolNode',
    data: {
      question: 'Do you like cats?',
    },
    yesId: '1',
    noId: '2',
  },
  {
    id: '1',
    type: 'default',
    children: [],
    data: {
      label: 'You like cats',
    },
  },
  {
    id: '2',
    type: 'default',
    children: [],
    data: {
      label: "You don't like cats",
    },
  },
];
