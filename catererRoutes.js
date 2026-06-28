const express = require('express');
const { 
  registerCaterer, 
  getCaterers, 
  getCatererById, 
  updateCaterer, 
  deleteCaterer 
} = require('../controllers/catererController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCaterers);
router.get('/:id', getCatererById);
router.post('/', protect, registerCaterer);
router.put('/:id', protect, updateCaterer);
router.delete('/:id', protect, deleteCaterer);

module.exports = router;