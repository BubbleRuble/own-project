import RegisterForm from '../components/RegisterForm';
import { registerUser, loginUser, currentUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      await registerUser(values);

      const loginRes = await loginUser({
        email: values.email,
        password: values.password,
      });
      console.log("userData:", loginRes.user);

      const token = loginRes.token;

      if (token) {
        localStorage.setItem("token", token)
      }

      const userData = await currentUser();
      login(userData,token)

      resetForm();
      navigate('/dashboard', { replace: true});
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
