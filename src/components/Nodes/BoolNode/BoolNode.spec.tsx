import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BoolNode } from 'components/Nodes/BoolNode/BoolNode';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {});

describe('BoolNode', () => {
  it('renders a node', () => {
    const label = 'what site type?';
    render(
      <ReactFlowProvider>
        <BoolNode
          id={''}
          data={{
            label,
            yesId: '',
            noId: '',
            children: [],
          }}
          selected={false}
          type={''}
          zIndex={0}
          isConnectable={false}
          xPos={0}
          yPos={0}
          dragging={false}
        />
      </ReactFlowProvider>
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });
  it('renders a yes and no button', () => {
    render(
      <ReactFlowProvider>
        <BoolNode
          id={''}
          data={{
            label: 'this is a question?',
            noId: '',
            yesId: '',
            children: [],
          }}
          selected={false}
          type={''}
          zIndex={0}
          isConnectable={false}
          xPos={0}
          yPos={0}
          dragging={false}
        />
      </ReactFlowProvider>
    );
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();
  });
});
