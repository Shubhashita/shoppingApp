const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');

// Data File Path
const DATA_FILE = path.join(__dirname, '../data.json');

// Helper: Read Data
const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) return [];
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Helper: Write Data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data:', err);
    }
};

// Apply Middleware to all routes
router.use(authMiddleware);

// GET items (User specific)
router.get('/', (req, res) => {
    const items = readData();
    const userItems = items.filter(item => item.userId === req.user.id);
    res.json(userItems);
});

// POST new item
router.post('/', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Item text is required' });

    const items = readData();
    const newItem = {
        id: Date.now().toString(),
        text,
        completed: false,
        userId: req.user.id
    };

    items.push(newItem);
    writeData(items);
    res.status(201).json(newItem);
});

// PUT update item
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;

    const items = readData();
    const itemIndex = items.findIndex(item => item.id === id && item.userId === req.user.id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    const updatedItem = {
        ...items[itemIndex],
        text: text !== undefined ? text : items[itemIndex].text,
        completed: completed !== undefined ? completed : items[itemIndex].completed
    };

    items[itemIndex] = updatedItem;
    writeData(items);
    res.json(updatedItem);
});

// DELETE item
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let items = readData(); // Use let to reassign filter

    // Verify ownership before delete (optional, but good practice to check existence)
    const itemExists = items.find(item => item.id === id && item.userId === req.user.id);

    if (!itemExists) {
        return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    items = items.filter(item => item.id !== id);
    writeData(items);
    res.status(204).end();
});

module.exports = router;
