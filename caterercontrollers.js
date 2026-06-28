const Caterer = require('../models/Caterer');
const User = require('../models/User');

// Register Caterer
exports.registerCaterer = async (req, res) => {
  try {
    const catererData = {
      ...req.body,
      user: req.user.id
    };

    const caterer = await Caterer.create(catererData);
    
    res.status(201).json({
      success: true,
      message: 'Caterer registered successfully',
      data: caterer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Caterers (with filters)
exports.getCaterers = async (req, res) => {
  try {
    const { 
      city, 
      eventType, 
      budget, 
      rating, 
      vegNonVeg,
      foodCategory,
      page = 1,
      limit = 10
    } = req.query;

    const query = { isActive: true };

    if (city) query.address.city = city;
    if (eventType) query.serviceAreas = city;
    if (vegNonVeg) query.vegNonVeg = vegNonVeg;
    if (foodCategory) query.foodCategories = foodCategory;
    if (rating) query.rating = { $gte: parseFloat(rating) };
    if (budget) {
      const budgetRange = budget.split('-');
      query.pricing = {
        minPrice: budgetRange[0] ? { $lte: parseInt(budgetRange[0]) } : { $exists: true },
        maxPrice: budgetRange[1] ? { $gte: parseInt(budgetRange[1]) } : { $exists: true }
      };
    }

    // Premium caterers first
    const caterers = await Caterer.find(query)
      .populate('user', 'name email phone')
      .sort({ isPremium: -1, rating: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Caterer.countDocuments(query);

    res.status(200).json({
      success: true,
      data: caterers,
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Caterer by ID
exports.getCatererById = async (req, res) => {
  try {
    const caterer = await Caterer.findById(req.params.id)
      .populate('user', 'name email phone');
    
    if (!caterer) {
      return res.status(404).json({
        success: false,
        message: 'Caterer not found'
      });
    }

    const reviews = await require('../models/Review').find({ caterer: caterer._id });

    res.status(200).json({
      success: true,
      data: {
        ...caterer.toObject(),
        reviews
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Caterer
exports.updateCaterer = async (req, res) => {
  try {
    const caterer = await Caterer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Caterer updated successfully',
      data: caterer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Caterer
exports.deleteCaterer = async (req, res) => {
  try {
    await Caterer.findByIdAndUpdate(req.params.id, { isActive: false });

    res.status(200).json({
      success: true,
      message: 'Caterer deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};