import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import { tasksData } from './tasksData.js'; // (notice the .js)

const router = express.Router(); 

// Route: Get all tasks
router.get('/', (req, res) => {
    res.json(tasksData);
});

// Route: Get a task by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

// Add a new task
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done } = req.body;
    const newTask = {
      id: uuidv4(),   // Generate a random ID
      title,
      description,
      deadline,
      priority,
      done
    };
    tasksData.tasks.push(newTask); // Add the new task to the array
    res.status(201).json(newTask); // Return the new task
    tasksData.total_results++;     // Update the total results counter
  });
  

export default router;
