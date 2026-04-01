import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import TodoList from "./TodoList";
import LoginForm from "./LoginForm";
import PrivateRoute from "./PrivateRoute";

function App() {
  const TODOLIST_API_URL = '/api/todos/';
  const TODOLIST_LOGIN_URL = '/api/login/';
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              <PrivateRoute>
                <TodoList apiUrl={TODOLIST_API_URL} />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={<LoginForm loginUrl={LOGIN_API_URL} />}
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
