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
// Add a new task
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done } = req.body;
    const now = new Date().toISOString();  // Get current date-time
    const newTask = {
      id: uuidv4(),
      title,
      description,
      deadline,
      priority,
      done,
      created_at: now,
      updated_at: now
    };
    tasksData.tasks.push(newTask);
    res.status(201).json(newTask);
    tasksData.total_results++;
  });
  

  // Update an existing task
// Update an existing task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ status: 404, message: 'Task not found' });
    }
  
    const now = new Date().toISOString();  // Get current date-time
    const updatedTask = {
      ...tasksData.tasks[taskIndex],
      ...req.body,
      id: id,  // Ensure ID stays the same
      updated_at: now // Update timestamp
    };
  
    tasksData.tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  });
  

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    
    tasksData.tasks.splice(taskIndex, 1);
    res.status(204).send();  // No content
    tasksData.total_results--;
});

  

export default router;
