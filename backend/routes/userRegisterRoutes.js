const express = require('express');
const router = express.Router();
const connectToDB = require('../config/dbConfig'); // Import the connectToDB function
const User = require('../models/User'); // Import your User model

// Route to handle user registration
router.post('/register', async (req, res) => {
  try {
    console.log('Received registration request:', req.body);

    // Connect to the database
    const { client, db } = await connectToDB();

    try {
      // Get the users collection from the database
      const Users = db.collection('users');

      // Check if the email is already registered
      const existingUser = await Users.findOne({ email: req.body.email });

      // If email is already in use, return an error message to the frontend
      if (existingUser) {
        console.error('Email is already in use');
        return res.status(400).json({ error: 'Email is already in use. Please choose a different email.' });
      }

      // Extract all data from req.body
      const {
        parentFirstName,
        parentSurname,
        email,
        postalCode,
        homeAddress,
        phoneNumberParent1,
        phoneNumberParent2,
        kids,
        password // Include password field
      } = req.body;

      // Create a new User instance
      const newUser = new User({
        parentFirstName,
        parentSurname,
        email,
        password,
        postalCode,
        homeAddress,
        phoneNumberParent1,
        phoneNumberParent2,
        kids // Include kids array with activities
      });

      console.log('New user instance:', newUser);

      // Save the new user to the database
      await Users.insertOne(newUser);

      console.log('User registered successfully');

      // Respond with a success message to the frontend
      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } finally {
      // Close the database connection
      await client.close();
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'An error occurred while registering user' });
  }
});

module.exports = router;
