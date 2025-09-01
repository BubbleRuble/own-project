import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

const MovieForm = ({onSubmit}) => {
  const validationSchema = Yup.object({
    title:Yup.string().required("Title is required"),
    author:Yup.string().required("Author is required"),
    genre:Yup.string().required("Genre is required"),
    date: Yup.string().matches(/^\d{2}-\d{4}$/, "Date must be MM-YYYY"),
    favorite: Yup.boolean(),
  })


  return (
    <>
      <Formik
        initialValues={{
          title: '',
          author: '',
          genre: '',
          date: '',
          favorite: false,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >

        <Form autoComplete='off'>
          <label>
            Title
            <Field type="text" name="title" />
          </label>
          <br />

          <label>
            Author
            <Field type="text" name="author" />
          </label>
          <br />

          <label>
            Genre
            <Field type="text" name="genre" />
          </label>
          <br />

          <label>
            Date
            <Field type="text" name="date" />
          </label>
          <br />

          <label>
            Favorite
            <Field type="checkbox" name="favorite" />
          </label>
          <br />

          <button type="submit">Add movie</button>
        </Form>
      </Formik>
    </>
  );
};

export default MovieForm;
