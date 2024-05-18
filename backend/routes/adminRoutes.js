const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectToDB = require('../config/dbConfig'); // Import the connectToDB function

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Received login request with email:', email);
    console.log('Received login request with password:', password);

    // Connect to the database
    const { client, db } = await connectToDB();

    try {
      // Get the users collection
      const Users = db.collection('users');

      // Find the user in the database
      const user = await Users.findOne({ email: email });
      
      // Check if user is found
      if (user) {
        console.log('User found:', user);

        // Compare the password
        const isMatch = (password === user.password);

        console.log('Password match result:', isMatch);

        // If passwords match, generate a JWT token
        if (isMatch) {
          const token = jwt.sign({ _id: user._id }, 'your-secret-key', { expiresIn: '1h' });

          // Respond with the token
          return res.json({ token });
        } else {
          // If passwords don't match, respond with an error
          console.error('Invalid password provided');
          return res.status(400).json({ error: 'Invalid password' });
        }
      } else {
        // If user is not found, respond with an error
        console.error('User not found');
        return res.status(400).json({ error: 'User not found' });
      }
    } finally {
      // Close the database connection
      await client.close();
    }
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Login error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
