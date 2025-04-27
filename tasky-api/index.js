import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks/index.js'; // Remember the ./api/tasks/index.js
import './db';

dotenv.config();

const app = express();
const port = process.env.PORT;

// eslint-disable-next-line no-unused-vars
const errHandler = (err, req, res, next) => {
  /* If the error is in development, show full error,
     if in production, only show a simple message */
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send('Something went wrong!');
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack}`);
};


// 👇 Add this middleware to parse JSON
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

app.use(errHandler);

