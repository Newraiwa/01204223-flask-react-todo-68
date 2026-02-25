import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../TodoList';

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../context/AuthContext';

describe('TodoList', () => {

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());

    useAuth.mockReturnValue({
      username: 'testuser',
      accessToken: 'fake-token',
      login: vi.fn(),
      logout: vi.fn(),
    });
  });

  it('renders todo list', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        { id: 1, title: 'Test Todo', completed: false },
      ]),
    });

    render(<TodoList apiUrl="http://localhost:5000/api/todos/" />);

    expect(await screen.findByText('Test Todo')).toBeInTheDocument();
  });

  it('adds new todo', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 2, title: 'New Todo', completed: false }),
      });

    render(<TodoList apiUrl="http://localhost:5000/api/todos/" />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'New Todo');

    const button = screen.getByText('Add');
    await userEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

});