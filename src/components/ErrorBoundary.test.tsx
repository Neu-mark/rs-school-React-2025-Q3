import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const ErrorThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error from child component');
  }
  return <div>I am a happy component</div>;
};

describe('ErrorBoundary Component', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render children correctly when there is no error', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('I am a happy component')).toBeInTheDocument();
    expect(
      screen.queryByText('Oops! Something went wrong')
    ).not.toBeInTheDocument();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should catch an error and display a fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { name: /Oops! Something went wrong/i })
    ).toBeInTheDocument();
    const errorDetailsContainer = screen.getByRole('heading', {
      name: /Error Details:/i,
    }).parentElement;

    expect(errorDetailsContainer).toBeTruthy();
    if (errorDetailsContainer) {
      expect(errorDetailsContainer).toHaveTextContent(
        /Test error from child component/
      );
    }

    expect(
      screen.queryByText('I am a happy component')
    ).not.toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should reset error state by remounting ErrorBoundary when "Try Again" is clicked', async () => {
    const user = userEvent.setup();
    let key = 0;

    const { rerender } = render(
      <ErrorBoundary key={key}>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { name: /Oops! Something went wrong/i })
    ).toBeInTheDocument();

    const tryAgainButton = screen.getByRole('button', { name: /Try Again/i });
    await user.click(tryAgainButton);

    key += 1;
    rerender(
      <ErrorBoundary key={key}>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('I am a happy component')).toBeInTheDocument();
    expect(
      screen.queryByText('Oops! Something went wrong')
    ).not.toBeInTheDocument();
  });
});
