import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/form.css';
import * as Yup from 'yup';

const genrelist = [
  'action',
  'comedy',
  'drama',
  'horror',
  'science',
  'romance',
  'thriller',
];

const MovieForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    genre: Yup.string()
      .lowercase('Genre must be lowercase')
      .oneOf(genrelist, 'Invalid genre')
      .required('Genre is required'),
    date: Yup.string().matches(/^\d{4}$/, 'Date must be YYYY'),
    rating: Yup.string()
      .matches(
        /^(?:[1-9](?:\.\d)?|10)$/,
        'Rating must be a number between 1.0 and 10',
      )
      .required('Rating is required'),
  });

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          author: '',
          genre: '',
          date: '',
          rating: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="form-container">
          <Form autoComplete="off" className="form-list">
            <div class="form-group">
              <label>
                <span>Title</span>
                <Field type="text" name="title" />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="input-error"
                />
              </label>
            </div>

            <div class="form-group">
              <label>
                <span>Author</span>
                <Field type="text" name="author" />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="input-error"
                />
              </label>
            </div>

            <div class="form-group">
              <label>
                <span>Genre</span>
                <Field type="text" name="genre" />
                <ErrorMessage
                  name="genre"
                  component="div"
                  className="input-error"
                />
              </label>
            </div>

            <div class="form-group">
              <label>
                <span>Date</span>
                <Field type="text" name="date" />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="input-error"
                />
              </label>
            </div>

            <div class="form-group">
              <label>
                <span>Rating</span>
                <Field type="text" name="rating" />
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="input-error"
                />
              </label>
            </div>

            <button type="submit">Add movie</button>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default MovieForm;
