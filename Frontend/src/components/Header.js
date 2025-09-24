import { NavLink} from "react-router-dom";
import '../styles/header.css'

const Header = () => {
  const token = localStorage.getItem('token')

  return (
    <nav className="header__nav">
      <NavLink to="/">
        <img src="/newlogo.png" alt="logo" width="128" height="72" />
      </NavLink>

      <ul className="header__list">
        {!token ? (
          <>
            <li className="list__item">
              <NavLink to="/registration">Register</NavLink>
            </li>
            {/* <li className="list__item">
              <NavLink to="/login">Login</NavLink>
            </li> */}
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
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;