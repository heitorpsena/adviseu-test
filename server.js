import express from 'express';
import { config } from 'dotenv';
import colors from 'colors';

// Load env vars
config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
