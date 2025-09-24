import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = ({onSubmit}) => {
  const validationSchema = Yup.object({
  email:Yup.string().matches(emailRegexp, "Invalid email format").required("Email is required"),
  password:Yup.string().min(6, "Password must be min 6 characters").required("Password is required")
});

  return (
    <>
    <h1>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form autoComplete="off">
            <div className="form-group">
              <label>
                <span>Email</span>
                <Field type="text" name="email" />
                {touched.email && errors.email}
              </label>

              <label>
                <span>Password</span>
                <Field type="password" name="password" />
                {touched.password && errors.password}
              </label>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Log in
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
