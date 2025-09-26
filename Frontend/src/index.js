import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './styles/styles.css';
import App from './App';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>,
);
