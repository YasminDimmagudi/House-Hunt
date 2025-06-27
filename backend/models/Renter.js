const mongoose = require('mongoose');

const renterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

module.exports = mongoose.model('Renter', renterSchema);
