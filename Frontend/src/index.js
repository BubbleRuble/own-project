import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './styles/styles.css';
import App from './App';
import { BrowserRouter } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
);


// import React from 'react';
// import { NavLink, Outlet } from 'react-router-dom';

// const layout = () => {
//   return (
//     <header>
//       <div>
//         <ul>
//           <li>
//             <NavLink to='/'>Home</NavLink>
//           </li>
//         </ul>
//       </div>
//     </header>
//   );
// };

// export default layout; 
