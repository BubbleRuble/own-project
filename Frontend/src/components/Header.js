import { NavLink} from "react-router-dom";
import '../styles/header.css'
import { useAuth } from '../context/AuthContext'; 
import { Logout } from "./Logout";

const Header = () => {
  const {user, loading} = useAuth();

  if (loading) return null

  return (
    <nav className="header__nav">
      <NavLink to="/">
        <img src="/newlogo.png" alt="logo" width="128" height="72" />
      </NavLink>

      <ul className="header__list">
        {!user ? (
          <>
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
              <NavLink to="/postmovies">Post movies</NavLink>
            </li>
            <li className="list__item">
              <NavLink to="/searchmovies">Find movies</NavLink>
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