const PrivacyPolicy = require('../models/PrivacyPolicy');

// Get current privacy policy
exports.getPrivacyPolicy = async (req, res) => {
  try {
    // Since we're treating it as a singleton, get the most recent one
    const privacyPolicy = await PrivacyPolicy.findOne({ isPublished: true })
      .sort({ lastUpdated: -1 });
    
    if (!privacyPolicy) {
      return res.status(404).json({ message: 'Privacy policy not found' });
    }
    
    res.json(privacyPolicy);
  } catch (error) {
    console.error('Error getting privacy policy:', error);
    res.status(500).json({ message: 'Server error while retrieving privacy policy' });
  }
};

// Get all privacy policy versions (for admin)
exports.getAllPrivacyPolicies = async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find()
      .sort({ lastUpdated: -1 });
    res.json(policies);
  } catch (error) {
    console.error('Error getting all privacy policies:', error);
    res.status(500).json({ message: 'Server error while retrieving privacy policies' });
  }
};

// Create or update privacy policy
exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const { content, publishedVersion, effectiveDate, isPublished } = req.body;
    
    // Basic validation
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    
    // If an ID is provided, update existing, otherwise create new
    if (req.params.id) {
      const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(
        req.params.id,
        { 
          content, 
          publishedVersion,
          effectiveDate: effectiveDate || Date.now(),
          isPublished: isPublished !== undefined ? isPublished : true,
          lastUpdated: Date.now()
        },
        { new: true, runValidators: true }
      );
      
      if (!updatedPolicy) {
        return res.status(404).json({ message: 'Privacy policy not found' });
      }
      
      res.json(updatedPolicy);
    } else {
      // Create a new privacy policy
      const newPolicy = new PrivacyPolicy({
        content,
        publishedVersion: publishedVersion || '1.0',
        effectiveDate: effectiveDate || Date.now(),
        isPublished: isPublished !== undefined ? isPublished : true,
        lastUpdated: Date.now()
      });
      
      await newPolicy.save();
      res.status(201).json(newPolicy);
    }
  } catch (error) {
    console.error('Error updating privacy policy:', error);
    res.status(500).json({ message: 'Server error while updating privacy policy' });
  }
};

// Delete a privacy policy version (admin only)
exports.deletePrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findByIdAndDelete(req.params.id);
    
    if (!policy) {
      return res.status(404).json({ message: 'Privacy policy not found' });
    }
    
    res.json({ message: 'Privacy policy deleted successfully' });
  } catch (error) {
    console.error('Error deleting privacy policy:', error);
    res.status(500).json({ message: 'Server error while deleting privacy policy' });
  }
}; 