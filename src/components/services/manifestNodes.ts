import { ManifestNode } from "components/Tree/nodes";

export const createManifestNode = (
  data: Partial<ManifestNode>,
): ManifestNode => {
  return {
    id: "1",
    hidden: true,
    connectable: false,
    draggable: false,
    position: { x: 100, y: 100 },
    data: { label: "foo" },
    ...data,
  };
};
