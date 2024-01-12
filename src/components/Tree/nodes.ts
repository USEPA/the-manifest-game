import { Edge, Node } from "reactflow";

export interface ManifestNode extends Node {
  expanded?: boolean;
}

export const manifestNodes: Array<ManifestNode> = [
  {
    id: "1",
    expanded: false,
    connectable: false,
    draggable: false,
    position: { x: 100, y: 100 },
    data: { label: "foo" },
  },
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
  },
  {
    id: "4",
    hidden: true,
    connectable: false,
    draggable: false,
    position: { x: 200, y: 300 },
    data: { label: "bar" },
  },
  {
    id: "5",
    hidden: true,
    connectable: false,
    draggable: false,
    position: { x: 400, y: 300 },
    data: { label: "xxx" },
  },
  {
    id: "6",
    hidden: true,
    connectable: false,
    draggable: false,
    position: { x: 100, y: 300 },
    data: { label: "bar" },
  },
  {
    id: "7",
    hidden: true,
    connectable: false,
    draggable: false,
    position: { x: 300, y: 300 },
    data: { label: "xxx" },
  },
];

export const manifestEdges: Array<Edge> = [
  { id: "e1-2", hidden: true, source: "1", target: "2" },
  { id: "e1-3", hidden: true, source: "1", target: "3" },
  { id: "e3-4", hidden: true, source: "3", target: "4" },
  { id: "e3-5", hidden: true, source: "3", target: "5" },
  { id: "e2-6", hidden: true, source: "2", target: "6" },
  { id: "e2-7", hidden: true, source: "2", target: "7" },
];
