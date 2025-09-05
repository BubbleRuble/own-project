import { NavLink} from "react-router-dom";
import '../styles/header.css'

const Header = () => {

  return (
      <nav className="header__nav">
        <NavLink to="/">
          <img 
            src='https://graphicsprings.com/wp-content/uploads/2023/07/image-58-1024x512.png.webp' 
            alt='logo' 
            width='128' 
            height='72' 
          />
        </NavLink>
        <ul className="header__list">
          <li className="list__item">
            <NavLink to="/postmovies">Post movies</NavLink>
          </li>
          <li className="list__item">
            <NavLink to="/searchmovies">Find movies</NavLink>
          </li>
        </ul>
      </nav>
  );
}

export default Header;