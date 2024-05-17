// adminRoute.js

const express = require('express');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new Error('Admin not found');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign({ _id: admin._id.toString() }, 'your-secret-key');

    res.json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

