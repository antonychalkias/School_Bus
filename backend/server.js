// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const mapRoutes = require('./routes/mapRoutes');
const busRoutes = require('./routes/busRoutes');
const userPlanRoutes = require('./routes/userPlanRoutes');
const userBookingRoutes = require('./routes/userBookingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRegisterRoutes = require ('./routes/userRegisterRoutes');
// Middleware
app.use(bodyParser.json());
app.use(cors());



// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRegisterRoutes);
// app.use('/api/activities', activityRoutes);
// app.use('/api/maps', mapRoutes);
// app.use('/api/buses', busRoutes);
// app.use('/api/user-plans', userPlanRoutes);
// app.use('/api/user-bookings', userBookingRoutes);
// app.use('/api/notifications', notificationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
