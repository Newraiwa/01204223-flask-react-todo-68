import { render, screen } from '@testing-library/react'
import App from '../App.jsx'
import { vi } from 'vitest'

const mockResponse = (data) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  });
};

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});


const todoItem1 = { id: 1, title: 'First todo', done: false, comments: [] };

const todoItem2 = { 
  id: 2, 
  title: 'Second todo', 
  done: false, 
  comments: [
    { id: 1, message: 'First comment' },
    { id: 2, message: 'Second comment' },
  ] 
};

const originalTodoList = [
  todoItem1,
  todoItem2,
];


describe('App', () => {

  it('renders correctly', async () => {

    global.fetch.mockImplementationOnce(() =>
      mockResponse(originalTodoList)
    );

    render(<App />);

    expect(await screen.findByText('First todo')).toBeInTheDocument();
    expect(await screen.findByText('Second todo')).toBeInTheDocument();
  });


  it('toggles done on a todo item', async () => {

    const toggledTodoItem1 = { ...todoItem1, done: true };

    global.fetch
      .mockImplementationOnce(() => mockResponse(originalTodoList))
      .mockImplementationOnce(() => mockResponse(toggledTodoItem1));

    render(<App />);

    expect(await screen.findByText('First todo')).not.toHaveClass('done');

    const toggleButtons = await screen.findAllByRole('button', { name: /toggle/i });

    toggleButtons[0].click();

    expect(await screen.findByText('First todo')).toHaveClass('done');

    expect(global.fetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/1\/toggle/),
      { method: 'PATCH' }
    );
  });

});

