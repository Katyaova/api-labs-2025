import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks/index.js';
import usersRouter from './api/users/index.js';
import './db';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// eslint-disable-next-line no-unused-vars
const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send('Something went wrong!');
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack}`);
};

// Routers
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

// Start server
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

// Error handler (always LAST)
app.use(errHandler);
