const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caterer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caterer',
    required: true
  },
  eventDetails: {
    eventType: {
      type: String,
      required: true,
      enum: ['wedding', 'birthday', 'corporate', 'religious', 
             'party', 'college', 'other']
    },
    eventName: String,
    date: {
      type: Date,
      required: true
    },
    time: String,
    location: {
      address: String,
      city: String,
      state: String,
      landmark: String
    }
  },
  guestCount: {
    type: Number,
    required: true,
    min: 1
  },
  package: {
    type: String,
    required: true
  },
  menuItems: [{
    itemName: String,
    quantity: Number
  }],
  pricing: {
    pricePerPerson: Number,
    totalAmount: Number,
    convenienceFee: Number,
    discount: Number,
    finalAmount: Number
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    method: String,
    transactionId: String,
    amount: Number,
    paidAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  reviews: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    photos: [String],
    reviewedAt: Date
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);