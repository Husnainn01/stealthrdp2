const mongoose = require('mongoose');

// Define schema
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Services & Plans', 'Pricing & Billing', 'Account Management', 'Technical Support & Security'],
    default: 'Services & Plans'
  },
  displayOrder: {
    type: Number,
    default: 1
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'faqs'
});

// Create and export the model
const Faq = mongoose.model('Faq', faqSchema);

module.exports = Faq; 