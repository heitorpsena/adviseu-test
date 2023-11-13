import { ErrorResponse } from '../utils/errorResponse.js';
import { asyncHandler } from '../middlewares/async.js';
import axios from 'axios';

let storedUser = [];

// @desc        Get all users
// @route       GET /api/v1/users
// @access      Public
export const getUsers = asyncHandler(async (req, res, next) => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  if (!response) {
    return next(
      new ErrorResponse('Error while trying to acccess the external API.', 500)
    );
  }
  const apiData = response.data;

  if (storedUser.length > 0) {
    const users = storedUser.filter(
      (obj, index, array) =>
        index ===
        array.findIndex(
          (innerObj) => JSON.stringify(innerObj) === JSON.stringify(obj)
        )
    );
    apiData.push(...users);
  }

  res.status(200).json({ sucess: true, data: apiData });
});

// @desc        Get single user
// @route       GET /api/v1/users/:id
// @access      Public
export const getUser = asyncHandler(async (req, res, next) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${req.params.id}`
  );

  if (!response) {
    return next(
      new ErrorResponse('Error while trying to acccess the external API.', 500)
    );
  }
  const apiData = response.data;
  res.status(200).json({ sucess: true, data: apiData });
});

// @desc        Create user
// @route       POST /api/v1/users
// @access      Public
export const createUser = asyncHandler(async (req, res, next) => {
  const newUser = req.body;
  const response = await axios.post(
    `https://jsonplaceholder.typicode.com/users`,
    newUser
  );
  if (!response) {
    return next(
      new ErrorResponse('Error while trying to acccess the external API.', 500)
    );
  }

  storedUser.push(response.data);
  res.status(201).json({ sucess: true, data: response.data });
});
