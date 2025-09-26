import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/userface.css';
import * as Yup from 'yup';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const RegisterForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
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
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <div className="register-form-container">
            <Form autoComplete="off" className="form-list">
              <div className="register-form-group">
                <label>
                  <span>Name</span>
                  <Field type="text" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="input-error"
                  />
                </label>
              </div>

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

              <button type="submit" disabled={isSubmitting}>
                Sign up
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
