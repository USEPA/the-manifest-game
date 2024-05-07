import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { HtmlHelp } from 'components/Help/HtmlHelp/HtmlHelp';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

describe('HtmlHelp', () => {
  test('displays a default message if not content passed', () => {
    render(<HtmlHelp />);
    expect(screen.getByText(/unavailable/i)).toBeInTheDocument();
  });
  test('renders content', () => {
    const content = '<p>content</p>';
    render(<HtmlHelp content={content} />);
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });
  test('sanitizes script tags from html', () => {
    const content = '<p>content</p><script data-testid="scriptElement">alert("xss")</script>';
    render(<HtmlHelp content={content} />);
    expect(screen.queryByTestId(/scriptElement/i)).not.toBeInTheDocument();
  });
});
