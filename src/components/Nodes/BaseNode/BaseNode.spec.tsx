import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { BaseNode } from 'components/Nodes/BaseNode/BaseNode';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, it } from 'vitest';

describe('BaseNode', () => {
  afterEach(() => cleanup());
  it('renders', () => {
    render(
      <ReactFlowProvider>
        <BaseNode
          id={'1'}
          dragging={false}
          selected={false}
          type={''}
          zIndex={0}
          isConnectable={false}
          xPos={0}
          yPos={0}
        >
          <div>Test</div>
        </BaseNode>
      </ReactFlowProvider>
    );
    expect(screen.getByTestId('node-1')).toBeInTheDocument();
  });
});
