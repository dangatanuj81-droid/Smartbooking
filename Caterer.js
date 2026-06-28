const mongoose = require('mongoose');

const CatererSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required']
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: String,
    country: { type: String, default: 'India' }
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  serviceAreas: [{
    type: String
  }],
  foodCategories: [{
    type: String,
    enum: ['Indian', 'Continental', 'Chinese', 'Mughlai', 'South Indian', 
           'North Indian', 'Fast Food', ' Desserts', 'Bakery', 'Snacks']
  }],
  vegNonVeg: {
    type: String,
    enum: ['veg', 'non-veg', 'both'],
    default: 'both'
  },
  photos: [{
    type: String
  }],
  menu: [{
    itemName: String,
    category: String,
    price: Number,
    isVeg: Boolean,
    description: String
  }],
  packages: [{
    name: String,
    type: String,
    pricePerPerson: Number,
    items: [String],
    description: String
  }],
  pricing: {
    minPrice: Number,
    maxPrice: Number
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  subscriptionPlan: {
    type: String,
    enum: ['free', 'premium', 'business', 'enterprise'],
    default: 'free'
  },
  availability: {
    type: Map,
    of: Boolean
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Caterer', CatererSchema);