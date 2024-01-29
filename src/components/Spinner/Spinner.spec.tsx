import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Spinner } from 'components/Spinner/Spinner';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => cleanup());

describe('Spinner', () => {
  it('renders a spinner', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
