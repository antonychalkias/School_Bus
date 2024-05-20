const express = require('express');
const router = express.Router();
const connectToDB = require('../config/dbConfig');
const Plan = require('../models/UserPlan');

// Middleware to ensure DB connection is established
router.use(async (req, res, next) => {
  await connectToDB();
  next();
});

// Route to fetch all plans
router.get('/plans', async (req, res) => {
  try {
    console.log('Fetching plans...');
    
    // Connect to the database
    const { client, db } = await connectToDB();
    
    // Access the plans collection
    const plansCollection = db.collection('plans');

    // Fetch all plans from the plans collection
    const plans = await plansCollection.find({}).toArray();

    // Return the plans as JSON response
    return res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return res.status(500).json({ error: 'An error occurred while fetching plans' });
  }
});

// Route to update a specific plan
router.put('/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    const { title, availableRoutes, availableSeats, price, activities, description } = req.body;

    // Find the plan by ID and update its details
    const updatedPlan = await Plan.findByIdAndUpdate(
      planId,
      { title, availableRoutes, availableSeats, price, activities, description },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    return res.status(200).json({ message: 'Plan updated successfully', plan: updatedPlan });
  } catch (error) {
    console.error('Error updating plan:', error);
    return res.status(500).json({ error: 'An error occurred while updating the plan' });
  }
});

// Route to add a new plan
router.post('/', async (req, res) => {
  try {
    // Extract plan details from the request body
    const { title, availableRoutes, availableSeats, price, activities, description } = req.body;

    // Check if title and price fields exist
    if (!title || !price) {
      return res.status(400).json({ error: 'Title and Price fields are required' });
    }

    // Create a new UserPlan instance
    const newUserPlan = new Plan({
      title,
      availableRoutes,
      availableSeats,
      price,
      activities,
      description
    });

    // Save the new plan to the database
    await newUserPlan.save();

    console.log('Plan added successfully');

    // Respond with a success message
    return res.status(201).json({ message: 'Plan added successfully', plan: newUserPlan });
  } catch (error) {
    console.error('Error adding plan:', error);
    return res.status(500).json({ error: 'An error occurred while adding the plan' });
  }
});

// Route to import data into the Plans collection
router.post('/import', async (req, res) => {
  try {
    // Data to import
    const plansToImport = req.body.plans; // Assuming the frontend sends an array of plans

    // Connect to the database
    const { client, db } = await connectToDB();

    try {
      // Get the plans collection from the database
      const Plans = db.collection('plans');

      // Insert each plan into the Plans collection
      for (const planData of plansToImport) {
        await Plans.insertOne(planData);
      }

      console.log('Plans imported successfully');

      return res.status(201).json({ message: 'Plans imported successfully' });
    } finally {
      // Close the database connection
      await client.close();
    }
  } catch (error) {
    console.error('Error importing plans:', error);
    return res.status(500).json({ error: 'An error occurred while importing plans' });
  }
});

module.exports = router;
