import { ManifestNode } from "services/tree/treeService";

export const dummyManifestTree: Array<ManifestNode> = [
  {
    id: "1",
    expanded: false,
    connectable: false,
    draggable: false,
    position: { x: 100, y: 100 },
    data: { label: "foo" },
    children: [
      {
        id: "2",
        hidden: true,
        connectable: false,
        draggable: false,
        position: { x: 100, y: 200 },
        data: { label: "bar" },
      },
      {
        id: "3",
        hidden: true,
        connectable: false,
        draggable: false,
        position: { x: 300, y: 200 },
        data: { label: "xxx" },
        children: [
          {
            id: "4",
            hidden: true,
            connectable: false,
            draggable: false,
            position: { x: 300, y: 300 },
            data: { label: "xxx" },
          },
          {
            id: "5",
            hidden: true,
            connectable: false,
            draggable: false,
            position: { x: 500, y: 300 },
            data: { label: "xxx" },
            children: [
              {
                id: "6",
                hidden: true,
                connectable: false,
                draggable: false,
                position: { x: 500, y: 400 },
                data: { label: "xxx" },
              },
              {
                id: "7",
                hidden: true,
                connectable: false,
                draggable: false,
                position: { x: 700, y: 400 },
                data: { label: "xxx" },
              },
            ],
          },
        ],
      },
    ],
  },
];
