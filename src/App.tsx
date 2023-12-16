import React, {useCallback} from 'react';
import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    MiniMap,
    Node,
    useEdgesState,
    useNodesState
} from 'reactflow';

import 'reactflow/dist/style.css';

interface ManifestNode extends Node {
    expanded?: boolean;
}

const initialNodes: Array<ManifestNode> = [
    {id: '1', expanded: false, connectable: false, draggable: false, position: {x: 100, y: 100}, data: {label: 'foo'}},
    {id: '2', hidden: true, connectable: false, draggable: false, position: {x: 100, y: 200}, data: {label: 'bar'}},
    {id: '3', hidden: true, connectable: false, draggable: false, position: {x: 300, y: 200}, data: {label: 'xxx'}},
];
const initialEdges: Array<Edge> = [{id: 'e1-2', hidden: true, source: '1', target: '2'}, {
    id: 'e1-3',
    hidden: true,
    source: '1',
    target: '3'
}];

const getNodeTargets = ({edges, source}: { edges: Array<Edge>, source: string }): Array<string> => {
    return edges.filter(edge => edge.source === source).map(edge => edge.target)
}

// const getEdges = ({edges, source}: { edges: Array<Edge>, source: string }): Array<Edge> => {
//     return edges.filter(edge => edge.source !== source)
// }

const setHiddenNodes = ({targets, nodes, expanded}: {
    targets: Array<string>,
    nodes: Array<ManifestNode>
    expanded: boolean
}): Array<ManifestNode> => {
    return nodes.map(node => {
        if (targets.includes(node.id)) {
            return {...node, hidden: !expanded}
        }
        return node
    })
}

const setExpanded = ({source, nodes}: { source: string, nodes: Array<ManifestNode> }): Array<ManifestNode> => {
    return nodes.map(node => {
        if (node.id === source) {
            return {...node, expanded: !node.expanded}
        }
        return node
    })
}

export default function App() {
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    console.log(edges)

    const onClick = useCallback(
        (event: React.MouseEvent, node: ManifestNode) => {
            const targets: Array<string> = getNodeTargets({edges, source: node.id})
            console.log(targets)
            const intermediaNodes = setExpanded({source: node.id, nodes})
            const newNodes = setHiddenNodes({nodes: intermediaNodes, targets, expanded: !node.expanded})
            const updatedEdges = edges.map(edge => {
                if (targets.includes(edge.target)) {
                    return {...edge, hidden: node.expanded}
                }
                return edge
            })
            setEdges(updatedEdges)
            setNodes(newNodes)
        },
        [edges, nodes, setEdges, setNodes]
    )

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onClick}
            >
                <Background variant={BackgroundVariant.Dots}/>
                <MiniMap nodeStrokeWidth={3}/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}

