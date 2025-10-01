import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';
import { LoginForm } from '../components/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      await login(values.email, values.password);
      
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.log(err?.response?.data?.message)
      setFieldError('general', err?.response?.data?.message || 'Email or password invalid');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
};

export default Login;
