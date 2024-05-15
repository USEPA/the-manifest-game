import { render, RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren, ReactElement } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { afterEach, beforeEach, vi } from 'vitest';

interface DecisionTreeRenderOptions extends RenderOptions {
  memoryRouterProps?: MemoryRouterProps;
}

/**
 * @description
 * A utility wrapper for testing we do not need to render misc providers in all tests,
 * and our components can remain unaware of each other. see:
 * https://testing-library.com/docs/react-testing-library/setup/#custom-render
 */
export function renderWithProviders(
  ui: React.ReactElement,
  {
    memoryRouterProps,
    ...renderOptions // react-testing library function options
  }: DecisionTreeRenderOptions = {} // default to empty object
) {
  function Wrapper({ children }: PropsWithChildren<object>): ReactElement {
    return (
      <MemoryRouter {...memoryRouterProps}>
        <ReactFlowProvider>{children}</ReactFlowProvider>
      </MemoryRouter>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export const notFirstTimeMock = () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  beforeEach(() => {
    localStorage.setItem('tmg-first-time', 'false');
  });
};
