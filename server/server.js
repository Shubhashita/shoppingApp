const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', apiRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Shopping List API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
