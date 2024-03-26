import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Help } from 'components/Help/Help';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

describe('Help', () => {
  test('renders', () => {
    render(<Help />);
    expect(screen.getByText(/help/i)).toBeInTheDocument();
  });
});
