import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

function PrivateRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return null;
  return token ? children : <Navigate to="/login" />;
}

// Redirect logged-in users away from auth pages? Optional.
// For now, simple routing.

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ paddingTop: '80px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/list"
              element={
                <PrivateRoute>
                  <Dashboard viewMode="pending" title="Shopping List" />
                </PrivateRoute>
              }
            />
            <Route
              path="/mylist"
              element={
                <PrivateRoute>
                  <Dashboard viewMode="completed" title="My List" />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
