import { Formik, Form, Field, ErrorMessage } from 'formik';
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
        {({ errors, touched, isSubmitting }) => (
          <Form autoComplete="off">
            <div className="form-group">
              <label>
                <span>Name</span>
                <Field type="text" name="name" />
                {touched.name && errors.name}
              </label>

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
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
