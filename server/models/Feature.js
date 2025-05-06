const mongoose = require('mongoose');

// Schema definition
const FeatureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Feature title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Feature description is required'],
    trim: true,
  },
  iconName: {
    type: String,
    required: [true, 'Icon name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'core-services',
      'hardware-resources',
      'security-management',
      'specialized-use-cases',
      'service-guarantees'
    ],
    trim: true,
  },
  displayOrder: {
    type: Number,
    default: 0, // Lower numbers will be displayed first
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Feature', FeatureSchema); 