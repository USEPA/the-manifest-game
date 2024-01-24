import '@testing-library/jest-dom';
import { loadTree } from 'services/config/config';
import { describe, expect, test } from 'vitest';

describe('Config logic', () => {
  test('Loads a DecisionTree from an array of objects', () => {
    const nodeId = '1';
    const decisionTree = loadTree([{ id: nodeId, data: { label: 'foo', children: ['2', '3'] } }]);
    expect(decisionTree[nodeId].data.label).toBe('foo');
    expect(Object.keys(decisionTree).length).toBe(1);
  });
});
