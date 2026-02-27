import { useEffect, useState } from 'react'
import './App.css'
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm({loginUrl}) {
  const { login, username: loggedInUsername, accessToken } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [accessToken, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(username, data.access_token);
        navigate('/');
        console.log(data);
        alert("Login successful.  access token = " + data.access_token);
      } else if (response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        const text = await response.text().catch(() => "");
        setErrorMessage(text || `Login failed (${response.status})`);
      }
    } catch (error) {
      console.log("Error logging in:", error);
      setErrorMessage("Network error while logging in");
    }
  }

  return (
    <form onSubmit={(e) => {handleLogin(e)}}>
      {errorMessage && <p>{errorMessage}</p>}
      Username:
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br/>
      Password:
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button type="submit">Login</button>
      {accessToken && loggedInUsername && <p>User {loggedInUsername} is already logged in.</p>}
    </form>
  );
}

export default LoginForm;
