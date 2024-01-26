import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useDecisionTree } from 'hooks/useDecisionTree/useDecisionTree';
import { DecisionTree } from 'store/treeStore';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => {});

const TestComponent = ({ initialTree }: { initialTree?: DecisionTree }) => {
  const initialValue = initialTree || {};
  const { nodes, edges } = useDecisionTree(initialValue);
  return (
    <>
      <p>nodes</p>
      {nodes.map((node) => (
        <ul key={node.id}>
          <li>id: {node.id}</li>
          <li>hidden: {node.hidden ? 'yes' : 'no'} </li>
        </ul>
      ))}
      <p>edges</p>
      {edges.map((edge) => (
        <ul key={edge.id}>
          <li>id: {edge.id}</li>
          <li>source: {edge.source}</li>
          <li>target: {edge.target}</li>
        </ul>
      ))}
    </>
  );
};

describe('useDecisionTree', () => {
  test('returns an object containing the nodes', () => {
    const myNodes: DecisionTree = {
      1: {
        id: '1',
        data: { label: 'foo', children: ['2'] },
      },
    };
    render(<TestComponent initialTree={myNodes} />);
    expect(screen.getByText('id: 1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });
});
