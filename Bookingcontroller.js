const Booking = require('../models/Booking');
const Caterer = require('../models/Caterer');

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { catererId, eventDetails, guestCount, package, menuItems } = req.body;

    const caterer = await Caterer.findById(catererId);
    if (!caterer) {
      return res.status(404).json({
        success: false,
        message: 'Caterer not found'
      });
    }

    // Calculate pricing
    const packageDetails = caterer.packages.find(p => p.name === package);
    const pricePerPerson = packageDetails ? packageDetails.pricePerPerson : 0;
    const totalAmount = pricePerPerson * guestCount;
    const convenienceFee = totalAmount * 0.02; // 2% fee
    const finalAmount = totalAmount + convenienceFee;

    const booking = await Booking.create({
      customer: req.user.id,
      caterer: catererId,
      eventDetails,
      guestCount,
      package,
      menuItems,
      pricing: {
        pricePerPerson,
        totalAmount,
        convenienceFee,
        finalAmount
      },
      status: 'pending'
    });

    // Emit socket event
    req.io.emit('new-booking', booking);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Bookings for User
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate('caterer', 'businessName photos rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('caterer', 'businessName photos rating phone address');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Booking Status
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Booking status updated',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add Review
exports.addReview = async (req, res) => {
  try {
    const Review = require('../models/Review');
    const { rating, comment, photos } = req.body;

    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const review = await Review.create({
      user: req.user.id,
      caterer: booking.caterer,
      booking: booking._id,
      rating,
      comment,
      photos
    });

    // Update caterer rating
    const reviews = await Review.find({ caterer: booking.caterer });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / reviews.length;

    await Caterer.findByIdAndUpdate(booking.caterer, {
      rating: avgRating,
      totalReviews: reviews.length
    });

    booking.reviews = { rating, comment, photos, reviewedAt: new Date() };
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};