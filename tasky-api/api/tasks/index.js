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

export default router;
