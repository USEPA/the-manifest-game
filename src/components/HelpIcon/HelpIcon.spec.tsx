import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { HelpIcon } from './HelpIcon';

afterEach(() => cleanup());

describe('HelpIcon', () => {
  test('renders', () => {
    render(<HelpIcon />);
    expect(screen.getByLabelText(/help/i)).toBeInTheDocument();
  });
});
