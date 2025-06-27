const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  location: { type: String }, // Optional: if needed
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  sqft: { type: Number, required: true },
  type: { type: String, enum: ['apartment', 'house', 'studio', 'condo'], required: true },
  images: [{ type: String }],
  amenities: [{ type: String }],
  landlord: {
    name: String,
    phone: String,
    email: String,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
}, {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

module.exports = mongoose.model('Property', propertySchema);
