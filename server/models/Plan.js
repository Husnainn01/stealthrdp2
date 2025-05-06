const mongoose = require('mongoose');

// Schema definition
const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Plan description is required'],
    trim: true,
  },
  monthlyPrice: {
    type: Number,
    required: [true, 'Monthly price is required'],
    min: [0, 'Price cannot be negative'],
  },
  specs: {
    cpu: {
      type: String,
      required: [true, 'CPU specification is required'],
      trim: true,
    },
    ram: {
      type: String,
      required: [true, 'RAM specification is required'],
      trim: true,
    },
    storage: {
      type: String,
      required: [true, 'Storage specification is required'],
      trim: true,
    },
    bandwidth: {
      type: String,
      required: [true, 'Bandwidth specification is required'],
      trim: true,
    },
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: ['USA', 'EU'],
  },
  popular: {
    type: Boolean,
    default: false,
  },
  purchaseUrl: {
    type: String,
    required: [true, 'Purchase URL is required'],
    trim: true,
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Plan', PlanSchema); 