import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSearchTerm } from '../utils/storage';

const mockedGetSearchTerm = vi.mocked(getSearchTerm);

describe('Search Component', () => {
  let onSearchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSearchMock = vi.fn();
    vi.clearAllMocks();
  });

  it('should render with an initial value from props', () => {
    const initialValue = 'charizard';
    render(<Search onSearch={onSearchMock} initialValue={initialValue} />);
    const input = screen.getByPlaceholderText(
      'Enter Pokémon name (e.g., pikachu, charizard)...'
    );
    expect(input).toHaveValue(initialValue);
  });

  it('should display initialValue even if getSearchTerm returns something else', () => {
    mockedGetSearchTerm.mockReturnValue('squirtle');
    const initialValueFromProps = 'bulbasaur';
    render(
      <Search onSearch={onSearchMock} initialValue={initialValueFromProps} />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialValueFromProps);
    expect(mockedGetSearchTerm).not.toHaveBeenCalled();
  });

  it('should update input value when user types', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={onSearchMock} initialValue="" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'mewtwo');
    expect(input).toHaveValue('mewtwo');
  });

  it('should call onSearch with the same term when the search button is clicked', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={onSearchMock} initialValue="  pikachu  " />);
    const searchButton = screen.getByRole('button', { name: /Search/i });
    await user.click(searchButton);
    expect(onSearchMock).toHaveBeenCalledOnce();
    // Без trim, ожидаем вызов с пробелами, как есть
    expect(onSearchMock).toHaveBeenCalledWith('  pikachu  ');
  });

  it('should call onSearch when form is submitted via Enter key', async () => {
    const user = userEvent.setup();
    const searchTerm = 'snorlax';
    render(<Search onSearch={onSearchMock} initialValue={searchTerm} />);
    const input = screen.getByRole('textbox');
    await user.type(input, '{enter}');
    expect(onSearchMock).toHaveBeenCalledOnce();
    expect(onSearchMock).toHaveBeenCalledWith(searchTerm);
  });

  it('should disable input and button when disabled prop is true', () => {
    render(<Search onSearch={onSearchMock} initialValue="" disabled={true} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /Searching/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });
});
