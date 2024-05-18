// Import necessary modules
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  parentFirstName: {
    type: String,
    required: true
  },
  parentSurname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  homeAddress: {
    type: String,
    required: true
  },
  phoneNumberParent1: {
    type: String,
    required: true
  },
  phoneNumberParent2: {
    type: String,
    required: true
  },
  kids: [{
    name: {
      type: String,
      required: true
    },
    activities: [{
      activityName: {
        type: String,
        required: true
      }
    }]
  }]
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
