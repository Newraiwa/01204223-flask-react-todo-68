import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext.jsx'

function TodoList({ apiUrl }) {

  const { username, accessToken, logout } = useAuth();
  const [todoList, setTodoList] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchTodoList();
  }, []);

  async function fetchTodoList() {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setTodoList(data);

    } catch (err) {
      setTodoList([]);
    }
  }

  async function toggleDone(id) {
    await fetch(`${apiUrl}${id}/toggle/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    fetchTodoList();
  }

  async function deleteTodo(id) {
    await fetch(`${apiUrl}${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    fetchTodoList();
  }

  async function addNewTodo() {
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title: newTitle }),
    });

    setNewTitle("");
    fetchTodoList();
  }

  return (
    <>
      <h1>Todo List</h1>
      {username && <p>Welcome, {username}</p>}
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => toggleDone(todo.id)}>Toggle</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={addNewTodo}>Add</button>

      <br />
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default TodoList;