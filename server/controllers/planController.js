const Plan = require('../models/Plan');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Public
exports.getPlans = async (req, res) => {
  try {
    const location = req.query.location;
    let query = {};
    
    if (location && ['USA', 'EU'].includes(location)) {
      query.location = location;
    }
    
    const plans = await Plan.find(query).sort({ monthlyPrice: 1 });
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single plan
// @route   GET /api/plans/:id
// @access  Public
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    res.json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a plan
// @route   POST /api/plans
// @access  Private
exports.createPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid plan data', error: error.message });
  }
};

// @desc    Update a plan
// @route   PUT /api/plans/:id
// @access  Private
exports.updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    res.json(updatedPlan);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

// @desc    Delete a plan
// @route   DELETE /api/plans/:id
// @access  Private
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    res.json({ message: 'Plan removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
}; 