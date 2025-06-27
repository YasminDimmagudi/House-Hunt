const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: 'Renter' },
  date: Date,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
});

module.exports = mongoose.model('Booking', bookingSchema);
