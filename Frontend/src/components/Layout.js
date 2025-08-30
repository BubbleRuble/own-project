import React from 'react';
import '../styles/styles.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="main__container">
      
  <header>
    <div className="header__container">
      <Header />
    </div>
  </header>

  <main>
    <div className="home__container">
      <Outlet />
    </div>
  </main>

  <footer>
    <div className="footer__container">
      <Footer />
    </div>
  </footer>
</div>
  );
};

export default Layout;
