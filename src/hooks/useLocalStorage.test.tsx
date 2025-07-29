import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

const TestComponent = ({ initialValue }: { initialValue: string }) => {
  const [name, setName] = useLocalStorage('test-key', initialValue);
  return (
    <div>
      <p data-testid="value">{name}</p>
      <button onClick={() => setName('new value')}>Change Value</button>
    </div>
  );
};

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it('should use initial value if localStorage is empty', () => {
    render(<TestComponent initialValue="initial" />);
    expect(screen.getByTestId('value')).toHaveTextContent('initial');
  });

  it('should get initial value from localStorage if it exists', () => {
    window.localStorage.setItem('test-key', JSON.stringify('value from LS'));
    render(<TestComponent initialValue="initial" />);
    expect(screen.getByTestId('value')).toHaveTextContent('value from LS');
  });

  it('should update state and localStorage on change', async () => {
    const user = userEvent.setup();
    render(<TestComponent initialValue="initial" />);

    const button = screen.getByRole('button', { name: /Change Value/i });
    await user.click(button);

    expect(await screen.findByTestId('value')).toHaveTextContent('new value');
    expect(window.localStorage.getItem('test-key')).toBe(
      JSON.stringify('new value')
    );
  });
});
