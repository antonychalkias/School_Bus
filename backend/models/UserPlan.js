// In your UserPlan model (assuming it's using Mongoose)
const mongoose = require('mongoose');

const userPlanSchema = new mongoose.Schema({
  title: String, // Add title field
  availableRoutes: String,
  availableSeats: String,
  price: String,
  activities: Array,
  description: String
});

const UserPlan = mongoose.model('UserPlan', userPlanSchema);

module.exports = UserPlan;
