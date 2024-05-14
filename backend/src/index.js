// backend/src/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Define a test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
