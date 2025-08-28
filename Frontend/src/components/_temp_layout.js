import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const layout = () => {
  return (
    <header>
      <div>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default layout;
