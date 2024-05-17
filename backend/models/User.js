const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  homeAddress: String,
  postalCode: String,
  name: String,
  surname: String,
  phoneNumberParent1: String,
  phoneNumberParent2: String,
  kids: [
    {
      name: String,
      activities: [{ activityId: String, activityName: String }]
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
