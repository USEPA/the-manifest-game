import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Spinner } from '@/components/Spinner/Spinner';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

describe('Spinner', () => {
  test('renders a spinner', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
