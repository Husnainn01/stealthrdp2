const Faq = require('../models/Faq');

// Get all FAQs
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ displayOrder: 1 });
    res.json(faqs);
  } catch (error) {
    console.error('Error getting all FAQs:', error);
    res.status(500).json({ message: 'Server error while retrieving FAQs' });
  }
};

// Get only published FAQs
exports.getPublishedFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find({ isPublished: true }).sort({ displayOrder: 1 });
    res.json(faqs);
  } catch (error) {
    console.error('Error getting published FAQs:', error);
    res.status(500).json({ message: 'Server error while retrieving published FAQs' });
  }
};

// Get FAQs by category
exports.getFaqsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    // Find FAQs in the requested category
    const faqs = await Faq.find({
      category,
      isPublished: true
    }).sort({ displayOrder: 1 });
    
    res.json(faqs);
  } catch (error) {
    console.error('Error getting FAQs by category:', error);
    res.status(500).json({ message: 'Server error while retrieving FAQs by category' });
  }
};

// Get a single FAQ by ID
exports.getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    
    res.json(faq);
  } catch (error) {
    console.error('Error getting FAQ by ID:', error);
    res.status(500).json({ message: 'Server error while retrieving FAQ' });
  }
};

// Create a new FAQ
exports.createFaq = async (req, res) => {
  try {
    const { question, answer, category, displayOrder, isPublished } = req.body;
    
    // Basic validation
    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }
    
    // Create a new FAQ
    const newFaq = new Faq({
      question,
      answer,
      category: category || 'Services & Plans',
      displayOrder: displayOrder || 1,
      isPublished: isPublished !== undefined ? isPublished : true
    });
    
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ message: 'Server error while creating FAQ' });
  }
};

// Update an existing FAQ
exports.updateFaq = async (req, res) => {
  try {
    const { question, answer, category, displayOrder, isPublished } = req.body;
    
    // Find and update the FAQ
    const updatedFaq = await Faq.findByIdAndUpdate(
      req.params.id,
      { question, answer, category, displayOrder, isPublished },
      { new: true, runValidators: true }
    );
    
    if (!updatedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    
    res.json(updatedFaq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ message: 'Server error while updating FAQ' });
  }
};

// Delete a FAQ
exports.deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ message: 'Server error while deleting FAQ' });
  }
}; 