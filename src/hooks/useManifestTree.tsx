import {createManifestEdge} from "components/services";
import {ManifestNode} from "components/Tree/nodes";
import {useEffect} from "react";
import {Edge, useEdgesState, useNodesState} from "reactflow";

/**
 * useManifestNodes
 *
 * logic and interface for managing the interactive e-Manifest decision tree
 * returns an array of nodes to be used with the React Flow library and getter/setter functions
 * @param initialNodes
 */
export const useManifestTree = (initialNodes: Array<ManifestNode>) => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);

  useEffect(() => {
    const initialEdges: Array<Edge> = [];
    initialNodes.forEach((node) => {
      node.children?.forEach((child) => {
        initialEdges.push(createManifestEdge(node.id, child.id));
      });
    });
    setEdges(initialEdges);
  }, [initialNodes, setEdges]);

  return { nodes, setNodes, edges } as const;
};
