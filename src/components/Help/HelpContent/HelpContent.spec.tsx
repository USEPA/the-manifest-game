import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { HelpContent, TextHelp } from './HelpContent';

afterEach(() => cleanup());

describe('HelpContent', () => {
  test('renders', () => {
    render(<HelpContent />);
    expect(screen.getByTestId(/help-content/i)).toBeInTheDocument();
  });
  test('returns a friendly message if help prop is empty', () => {
    render(<HelpContent />);
    expect(screen.getByText(/unavailable/i, { exact: false })).toBeInTheDocument();
  });
  test('accepts an TextHelp object and displays the data as text', () => {
    const help: TextHelp = {
      type: 'text',
      data: 'This is a help message',
    };
    render(<HelpContent help={help} />);
    expect(screen.getByText(help.data)).toBeInTheDocument();
  });
});
