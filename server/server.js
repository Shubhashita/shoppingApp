const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', apiRoutes);


// Catch-all handler for React SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
