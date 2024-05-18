const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB URI
const dbName = 'SchoolBus'; // Your database name

// Function to establish a connection to the MongoDB database
const connectToDB = async () => {
  try {
    const client = new MongoClient(uri); // Create a new MongoClient instance without deprecated options
    await client.connect(); // Connect to the MongoDB server
    
    const db = client.db(dbName); // Get the database instance
    return { client, db }; // Return the client and database instances
  } catch (error) {
    throw error;
  }
};

module.exports = connectToDB;
