import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Toggle Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">✨ ShopList</Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/list" className="nav-link">Shopping List</Link>
        <Link to="/mylist" className="nav-link">My List</Link>
      </div>

      <div className="nav-user">
        {user ? (
          <div className="profile-container">
            <button
              className="nav-link profile-link"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              Profile ▾
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                  <div className="user-details">
                    <span className="user-name">{user.username}</span>
                    <span className="user-role">Member</span>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-item toggle-item">
                  <span>Dark Mode</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={theme === 'dark'}
                      onChange={toggleTheme}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-item">
                  <button onClick={logout} className="logout-btn-dropdown">Logout</button>
                </div>
              </div>
            )}

            {/* Backdrop to close menu when clicking outside */}
            {showProfileMenu && (
              <div className="menu-backdrop" onClick={() => setShowProfileMenu(false)}></div>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <div className="auth-buttons">
              <Link to="/login" className="wow-btn login-btn">Login</Link>
              <Link to="/register" className="wow-btn register-btn">Register</Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .navbar {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--card-border);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
        }

        .nav-brand a {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: var(--secondary-color);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
          background: none;
          border: none;
          font-size: 1rem;
          cursor: pointer;
        }

        .nav-link:hover, .nav-link.active {
          color: white;
        }

        .nav-user {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          position: relative;
        }
        
        .profile-container {
          position: relative;
        }

        .menu-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10;
          cursor: default;
        }

        .profile-dropdown {
          position: absolute;
          top: 150%;
          right: 0;
          width: 250px;
          background: #1e293b;
          border: 1px solid var(--card-border);
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
          animation: dropDown 0.2s ease-out;
          z-index: 20;
        }
        
        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: var(--primary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
        }
        
        .user-details {
          display: flex;
          flex-direction: column;
        }
        
        .user-name {
          color: white;
          font-weight: 600;
        }
        
        .user-role {
          font-size: 0.8rem;
          color: var(--secondary-color);
        }

        .dropdown-divider {
          height: 1px;
          background: var(--card-border);
          margin: 0.75rem 0;
        }

        .dropdown-item {
          padding: 0.5rem 0;
          color: var(--text-color);
        }
        
        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logout-btn-dropdown {
          width: 100%;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          transition: background 0.2s;
        }

        .logout-btn-dropdown:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        /* Toggle Switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
        }

        .toggle-switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: var(--primary-color);
        }

        input:checked + .slider:before {
          transform: translateX(20px);
        }

        @media (max-width: 600px) {
          .nav-links {
            display: none; 
          }
        }

        /* Wow Buttons */
        .auth-buttons {
          display: flex;
          gap: 1rem;
        }

        .wow-btn {
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
        }

        .login-btn {
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(4px);
        }

        .login-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .register-btn {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .register-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
          filter: brightness(1.1);
        }

        .register-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: 0.5s;
        }

        .register-btn:hover::after {
          left: 100%;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
