import RegisterForm from '../components/RegisterForm';
import { registerUser, loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      await registerUser(values);

      const loginRes = await loginUser({
        email: values.email,
        password: values.password,
      });
      const token = loginRes.token;

      if (token) {
        localStorage.setItem('token', token);
      }

      resetForm();
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
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
