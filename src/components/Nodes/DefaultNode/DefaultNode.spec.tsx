import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DefaultNode } from './DefaultNode';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {});

describe('DefaultNode', () => {
  it('renders a node with text', () => {
    const myLabel = 'what site type?';
    render(
      <ReactFlowProvider>
        <DefaultNode
          id={''}
          data={{
            label: myLabel,
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
    expect(screen.getByText(myLabel)).toBeInTheDocument();
  });
});
