import { ManifestNode } from 'services/tree/treeService';

export const dummyManifestTree: Array<ManifestNode> = [
  {
    id: '1',
    expanded: false,
    connectable: false,
    draggable: false,
    data: { label: 'foo' },
    children: [
      {
        id: '2',
        hidden: true,
        connectable: false,
        draggable: false,
        data: { label: 'bar' },
      },
      {
        id: '3',
        hidden: true,
        connectable: false,
        draggable: false,
        type: 'BoolNode',
        data: { question: 'xxx' },
        children: [
          {
            id: '4',
            hidden: true,
            connectable: false,
            draggable: false,
            data: { label: 'xxx' },
          },
          {
            id: '5',
            hidden: true,
            connectable: false,
            draggable: false,
            data: { label: 'xxx' },
            children: [
              {
                id: '6',
                hidden: true,
                connectable: false,
                draggable: false,
                data: { label: 'xxx' },
              },
              {
                id: '7',
                hidden: true,
                connectable: false,
                draggable: false,
                data: { label: 'xxx' },
              },
              {
                id: '8',
                hidden: true,
                connectable: false,
                draggable: false,
                data: { label: 'hhh' },
              },
              {
                id: '89',
                type: 'BoolNode',
                data: { question: 'what is your name?' },
              },
            ],
          },
        ],
      },
    ],
  },
];
