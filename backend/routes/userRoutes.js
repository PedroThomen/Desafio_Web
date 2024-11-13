// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.post('/logout', protect, userController.logout);
router.get('/profile', protect, userController.getUserProfile);
router.delete('/:uid', protect, userController.deleteUser);

module.exports = router;
