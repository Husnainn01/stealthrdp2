const Feature = require('../models/Feature');

// @desc    Get all features
// @route   GET /api/features
// @access  Public
exports.getFeatures = async (req, res) => {
  try {
    const category = req.query.category;
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const features = await Feature.find(query).sort({ displayOrder: 1 });
    res.json(features);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single feature
// @route   GET /api/features/:id
// @access  Public
exports.getFeatureById = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    res.json(feature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a feature
// @route   POST /api/features
// @access  Private
exports.createFeature = async (req, res) => {
  try {
    const newFeature = new Feature(req.body);
    const savedFeature = await newFeature.save();
    res.status(201).json(savedFeature);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid feature data', error: error.message });
  }
};

// @desc    Update a feature
// @route   PUT /api/features/:id
// @access  Private
exports.updateFeature = async (req, res) => {
  try {
    const updatedFeature = await Feature.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedFeature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    res.json(updatedFeature);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

// @desc    Delete a feature
// @route   DELETE /api/features/:id
// @access  Private
exports.deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    res.json({ message: 'Feature removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
}; 