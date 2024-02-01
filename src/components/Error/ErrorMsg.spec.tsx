import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { ErrorMsg } from 'components/Error/ErrorMsg';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => cleanup());

describe('ErrorMsg', () => {
  it('renders', () => {
    render(<ErrorMsg />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
  it('provides a configurable link to file a ticket', () => {
    const issueUrl = 'https://example.com/issues/new';
    vi.stubEnv('VITE_ISSUE_URL', issueUrl);
    render(<ErrorMsg />);
    const issueLink = screen.getByRole('link', { name: 'file a ticket' });
    expect(issueLink).toBeInTheDocument();
    expect(issueLink).toHaveAccessibleName('file a ticket');
    expect(issueLink).toHaveAttribute('href', issueUrl);
  });
});
