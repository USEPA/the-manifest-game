import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { CustomBaseEdge, isNumeric } from 'components/Tree/Edges/CustomBaseEdge';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

describe('Custom Base Edge', () => {
  test('renders', () => {
    render(<CustomBaseEdge path={''} />);
    expect(screen.getByTestId('edgePath')).toBeInTheDocument();
  });
  describe('utils', () => {
    test.each(['1', 1, 1.0, 1e5])('isNumeric returns true if number', (value) => {
      expect(isNumeric(value)).toBeTruthy();
    });
    test.each(['1er', 'hello', { field: 1 }])('isNumeric returns false if not number', (value) => {
      expect(isNumeric(value)).toBeFalsy();
    });
  });
});
