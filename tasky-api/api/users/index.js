import express from 'express';
import User from './userModel.js'; 

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Register (create) a user
router.post('/', async (req, res) => {
    await User(req.body).save();
    res.status(201).json({
        code: 201,
        msg: 'Successfully created new user.',
    });
});

export default router;
