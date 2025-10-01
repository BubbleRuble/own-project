import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { currentUser } from '../api/auth';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
});

function setAuthTokenHeader(token) {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     fetchMe().finally(() => setLoading(false));
//   } else {
//     setLoading(false);
//   }
// }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await currentUser();
          console.log('Fetched user:', data);
          setUser(data);
        } catch (error) {
          console.error('Не вдалося підвантажити юзера', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setAuthTokenHeader(token);
    console.log('token',token);
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const isAuthenticated = Boolean(token);

  const register = async ({name, email, password}) => {
    const res = await api.post('/auth/register', { name, email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    console.log('User',res.data.user);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const fetchMe = async () => {
    const res = await api.get('/auth/current');
    setUser(res.data);
    return res.data;
  }

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, isAuthenticated, login, register, logout, fetchMe, api }), [token, user, isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
