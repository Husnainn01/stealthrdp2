const mongoose = require('mongoose');

// Define schema
const privacyPolicySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  publishedVersion: {
    type: String,
    default: '1.0'
  },
  effectiveDate: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'privacyPolicies'
});

// We only want to have one privacy policy document active at a time
// This is a singleton model

// Create and export the model
const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);

module.exports = PrivacyPolicy; 