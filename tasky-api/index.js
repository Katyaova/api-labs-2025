import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks/index.js'; // Remember the ./api/tasks/index.js
import './db';

dotenv.config();

const app = express();
const port = process.env.PORT;

// 👇 Add this middleware to parse JSON
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
