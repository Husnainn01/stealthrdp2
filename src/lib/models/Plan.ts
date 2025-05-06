import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface to define our Plan type
export interface IPlan extends Document {
  name: string;
  description: string;
  monthlyPrice: number;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  location: 'USA' | 'EU';  // Location of the plan (USA or EU)
  popular?: boolean;       // Whether this is a popular/featured plan
  purchaseUrl: string;     // URL to purchase this plan
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const PlanSchema: Schema = new Schema({
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

// Check if the model already exists to prevent OverwriteModelError during hot reloading
export const Plan: Model<IPlan> = mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema);

export default Plan; 