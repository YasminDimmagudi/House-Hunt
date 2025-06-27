const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

module.exports = mongoose.model('Owner', ownerSchema);
