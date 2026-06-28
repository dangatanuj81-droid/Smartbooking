const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  caterer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caterer',
    required: true
  },
  plan: {
    type: String,
    enum: ['premium', 'business', 'enterprise'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  transactionId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);