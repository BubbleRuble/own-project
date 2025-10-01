import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, setFieldError }) => {
    try {
      await register( values );

      // await login(values.email, values.password);

      navigate('/dashboard', { replace: true });
    } catch (error) {
      setFieldError(
        'general',error?.response?.data?.message || 'Registration failed',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <RegisterForm onSubmit={handleRegister} />
    </>
  );
};

export default Register;
