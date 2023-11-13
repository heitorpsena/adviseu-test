import express from 'express';
import { config } from 'dotenv';
import colors from 'colors';
import { errorHandler } from './middlewares/error.js';

//Route file
import users from './routes/users.js';

// Load var env
config({ path: './config/config.env' });

const app = express();

// Body parser
app.use(express.json());

// Mount routers
app.use('/api/v1/users', users);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
