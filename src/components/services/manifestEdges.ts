import { Edge } from "reactflow";

export const createManifestEdge = (source: string, target: string): Edge => {
  return {
    id: `${source}-${target}`,
    hidden: true,
    source,
    target,
  };
};
