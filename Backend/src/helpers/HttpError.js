const errorMessageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

const HttpError = (status,message) => {
  const error = newError(message);
  error.status = status;
  return error;
};

module.exports = {
  errorMessageList,
  HttpError,
}
