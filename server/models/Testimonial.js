const mongoose = require('mongoose');

// Schema definition
const TestimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'Quote is required'],
    trim: true,
  },
  authorName: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  authorPosition: {
    type: String,
    trim: true,
  },
  authorCompany: {
    type: String,
    trim: true,
  },
  avatarUrl: {
    type: String,
    trim: true,
  },
  displayOrder: {
    type: Number,
    default: 0, // Lower numbers will be displayed first
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Testimonial', TestimonialSchema); 