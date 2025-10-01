import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link} from 'react-router-dom'
import '../styles/index.css';
import * as Yup from 'yup';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const LoginForm = ({onSubmit}) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(emailRegexp, 'Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be min 6 characters')
      .required('Password is required'),
  });
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          general: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <div className="register-form-container">
            <Form autoComplete="off" className="form-list">

              <div className="register-form-group">
                <label>
                  <span>Email</span>
                  <Field type="text" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="input-error"
                  />
                </label>
              </div>

              <div className="register-form-group">
                <label>
                  <span>Password</span>
                  <Field type="text" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="input-error"
                  />
                </label>
              </div>

              <ErrorMessage name="general" component="div" className="error" />

              <button type="submit" disabled={isSubmitting}>
                Log in
              </button>
              <div className="muted">
                No account? <Link to="/registration">Register</Link>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};
