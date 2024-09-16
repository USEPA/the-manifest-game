import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { CustomBaseEdge } from '@/components/Tree/Edges/CustomBaseEdge';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

describe('Custom Base Edge', () => {
  test('renders', () => {
    render(<CustomBaseEdge path={''} />);
    expect(screen.getByTestId('edgePath')).toBeInTheDocument();
  });
});
