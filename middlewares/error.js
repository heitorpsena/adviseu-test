import { ErrorResponse } from '../utils/errorResponse.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console
  console.log(err);

  if (err.response) {
    if (err.response.statusText === 'Not Found') {
      const message = `User not found`;
      error = new ErrorResponse(message, 404);
    }
  }

  res
    .status(error.statusCode || 500)
    .json({ sucess: false, error: error.message || 'Server Error' });
};
