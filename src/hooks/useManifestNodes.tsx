import { ManifestNode } from "components/Tree/nodes";
import { useNodesState } from "reactflow";

export const useManifestNodes = (initialNodes: Array<ManifestNode>) => {
  const [nodes, setNodes] = useNodesState(initialNodes);

  return [nodes, setNodes] as const;
};
