import '@testing-library/jest-dom';
import '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock('zustand'); // to make it works like Jest (auto-mocking)
