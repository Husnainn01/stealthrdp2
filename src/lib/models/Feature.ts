import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface to define our Feature type
export interface IFeature extends Document {
  title: string;
  description: string;
  iconName: string;       // Name of the Lucide icon to use
  category: string;       // To group features by category
  displayOrder: number;   // For controlling the display order
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const FeatureSchema: Schema = new Schema({
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
    default: 'general',
    trim: true,
  },
  displayOrder: {
    type: Number,
    default: 0, // Lower numbers will be displayed first
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Check if the model already exists to prevent OverwriteModelError during hot reloading
export const Feature: Model<IFeature> = mongoose.models.Feature || 
                                       mongoose.model<IFeature>('Feature', FeatureSchema);

export default Feature; 