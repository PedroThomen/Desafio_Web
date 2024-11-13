// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    registerUser, 
    deleteUser, 
    getUserProfile 
} = require('../controllers/userController');

router.post('/register', registerUser);
router.delete('/:uid', protect, deleteUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
