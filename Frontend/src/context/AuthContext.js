import { useState, useEffect, createContext, useContext } from 'react';
import { currentUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const login = (userData, token) => {
    if (token)localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = (token) => {
    if(token) localStorage.removeItem("token");
    setUser(null)
  }

  
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
