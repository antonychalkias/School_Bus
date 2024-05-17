// userRoutes.js
// userRoutes.js
const express = require('express');
const router = express.Router();

// Define your routes



const UserController = require('../controllers/userController');

// Define routes
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/register', UserController.createUser);
router.post('/login', UserController.login); // Make sure UserController has a login method

module.exports = router;
