import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { TextHelp, TextualHelp } from 'components/Help/HelpContent/TextualHelp';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

describe('TextualHelp', () => {
  test('renders', () => {
    render(<TextualHelp />);
    expect(screen.getByTestId(/help-content/i)).toBeInTheDocument();
  });
  test('returns a friendly message if help prop is empty', () => {
    render(<TextualHelp />);
    expect(screen.getByText(/unavailable/i, { exact: false })).toBeInTheDocument();
  });
  test('accepts an TextHelp object and displays the data as text', () => {
    const help: TextHelp = {
      type: 'text',
      content: 'This is a help message',
    };
    render(<TextualHelp help={help} />);
    expect(screen.getByText(help.content)).toBeInTheDocument();
  });
});
