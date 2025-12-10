import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <header className="app-header">
          <h1>Welcome Back</h1>
          <p>Login to access your list</p>
        </header>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>

        <style>{`
          .auth-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .auth-form input {
            padding: 0.75rem;
            border-radius: var(--radius);
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 1rem;
          }
          .auth-form button {
            background: var(--primary-color);
            color: white;
            padding: 0.75rem;
            border-radius: var(--radius);
            font-weight: 600;
            margin-top: 0.5rem;
          }
          .auth-form button:hover {
            background: var(--primary-hover);
          }
          .error-msg {
            color: #ef4444;
            text-align: center;
            background: rgba(239, 68, 68, 0.1);
            padding: 0.5rem;
            border-radius: var(--radius);
          }
          .auth-link {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.9rem;
            color: var(--secondary-color);
          }
          .auth-link a {
            color: var(--primary-color);
            text-decoration: none;
          }
          .auth-link a:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Login;
