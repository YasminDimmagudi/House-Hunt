const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /api/properties — List all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties); // Now auto-formats _id as id from model
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
});

module.exports = router;
