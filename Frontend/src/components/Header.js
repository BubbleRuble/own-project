import { NavLink } from 'react-router-dom';
import '../styles/header.css';
import { useAuth } from '../context/AuthContext';
import { Logout } from './Logout';
import { ThemeProvider, useTheme } from '../Theme/ThemeContext';

const Header = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
      <button
        onClick={toggleTheme}
        className="theme-button"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </button>
    );
  };

  return (
    <nav className="header__nav">
      <NavLink to="/">
        <img src="/newlogo.png" alt="logo" width="128" height="72" />
      </NavLink>

      <ul className="header__list">
        {!user ? (
          <>
            <li className="list__item">
              <ThemeToggle />
            </li>
            <li className="list__item">
              <NavLink to="/registration">Register</NavLink>
            </li>
            <li className="list__item">
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="list__item">
              <ThemeToggle />
            </li>
            <li className="list__item">
              <NavLink to="/postmovies">Post movies</NavLink>
            </li>
            <li className="list__item">
              <NavLink to="/searchmovies">Find movies</NavLink>
            </li>
            <li className="list__item">
              <NavLink to="/mycollection">My collection</NavLink>
            </li>
            <li className="list__item">
              <Logout />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
