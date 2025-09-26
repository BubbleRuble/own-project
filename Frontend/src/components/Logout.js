import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true})
  }

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};
