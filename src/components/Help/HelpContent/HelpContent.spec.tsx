import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { HelpContent } from './HelpContent';

afterEach(() => cleanup());

describe('HelpContent', () => {
  test('renders', () => {
    render(<HelpContent />);
    expect(screen.getByTestId(/help-content/i)).toBeInTheDocument();
  });
});
